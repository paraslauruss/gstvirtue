const express = require("express");
const Order = require('../models/order');// Make sure the correct path to the model is used
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const Product = require('../models/product');
const Customer = require('../models/customer');

router.get('/', async (req, res) => {
    try {
        const storeName = req.headers['store-name'];
        const apiVersion = req.headers['api-version'];
        const accessToken = req.headers['access-token'];

        if (!storeName || !apiVersion || !accessToken) {
            return res.status(400).json({ error: 'Missing required headers: store-name, api-version, access-token' });
        }

        const url = `https://${storeName}/admin/api/${apiVersion}/orders.json?status=any`;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
        };

        let shopifyOrders = [];
        try {
            const shopifyResponse = await axios.get(url, { headers });
            shopifyOrders = shopifyResponse.data.orders;
            console.log("Shopify Orders:", shopifyOrders);
        } catch (shopifyError) {
            return res.status(400).json({ error: 'Failed to fetch orders from Shopify', details: shopifyError.message });
        }

        if (!shopifyOrders.length) {
            const allOrders = await Order.find({ store_name: storeName }).lean();
            return res.status(200).json(allOrders);
        }

        const customerIds = Array.from(new Set(shopifyOrders.map(order => order.customer?.id).filter(Boolean)));
        let customerDataMap = new Map();
        if (customerIds.length > 0) {
            const customers = await Customer.find({ shopifyId: { $in: customerIds } }).lean();
            customerDataMap = new Map(customers.map(customer => [customer.customer_id, customer]));

        }

        const existingOrders = await Order.find({
            order_number: { $in: shopifyOrders.map(o => o.order_number) },
            store_name: storeName
        }).lean();

        const orderMap = new Map(existingOrders.map(o => [o.order_number, o]));

        for (const shopifyOrder of shopifyOrders) {
            if (!shopifyOrder.order_number) {
                console.warn(`Skipping order with missing order_number:`, shopifyOrder);
                continue;
            }

            const existingOrder = orderMap.get(shopifyOrder.order_number);

            let shopifyOrderId = shopifyOrder.id;

            if (!shopifyOrderId) {
                console.warn(`Missing shopifyOrder.id for order number ${shopifyOrder.order_number}. Generating a UUID.`);
                shopifyOrderId = uuidv4();
            }

            const orderData = {
                order_number: shopifyOrder.order_number || `unknown_${Date.now()}`,
                invoice_number: shopifyOrder.name || `#${shopifyOrder.order_number}`,
                date: shopifyOrder.created_at || new Date(),
                customer_name: shopifyOrder.customer
                    ? `${shopifyOrder.customer.first_name || ''} ${shopifyOrder.customer.last_name || ''}`.trim()
                    : null,
                total_price: shopifyOrder.total_price || 0,
                order_status_url: shopifyOrder.order_status_url || '',
                fulfillment_status: shopifyOrder.fulfillment_status || 'Unfulfilled',
                email: shopifyOrder.email || 'no-email@example.com',
                user_id: shopifyOrder.user_id || null,
                store_name: storeName,
                orderId: shopifyOrderId,
                payment_status: shopifyOrder.financial_status || 'pending',
                line_items: shopifyOrder.line_items || []  // Store the line items directly
            };

            if (!existingOrder) {
                await Order.create(orderData);
            } else {
                await Order.findOneAndUpdate(
                    { order_number: shopifyOrder.order_number, store_name: storeName },
                    { $set: orderData },
                    { upsert: true, new: true }
                );
            }
        }

        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});



module.exports = router;