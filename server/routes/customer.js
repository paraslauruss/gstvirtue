const express = require('express');
const Customer = require('../models/customer');  // Make sure the correct path to the model is used
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');


// router.post('/', async (req, res) => {
//     try {
//         const {customers} = req.body;
//         if (!Array.isArray(customers) || customers.length === 0) {
//             return res.status(400).json({ message: 'Products must be an array with at least one product.' });
//         }

//         const processedCustomers = [];
//         for (const customer of customers) {
//             const { id, title, firstName, lastName, email, phone, companyName,gstNumber,gst,hsnCode,miniAmount,miniGst,cess,address } = customer;
//             if (!id || isNaN(id)) {
//                 return res.status(400).json({ message: `Invalid product ID format for product: ${title}. ID must be numeric.` });
//             }
//             const updatedCustomer = await Customer.findOneAndUpdate(
//                 { id }, // Find by product ID
//                 { title, firstName, lastName, email, phone, companyName,gstNumber,gst,hsnCode,miniAmount,miniGst,cess,address  }, // Fields to update
//                 { new: true, upsert: true, setDefaultsOnInsert: true } // Upsert options
//             );
//             processedCustomers.push(updatedCustomer);
//         }
//         res.status(200).json({
//             message: 'Customer processed successfully',
//             products: processedCustomers,
//         });
//     } catch (error) {
//         console.error('Error processing products:', error.message);
//         res.status(500).json({ message: 'Failed to process customer', error: error.message });
//     }
// });

router.get('/', async (req, res) => {
    try {
        const storeName = req.headers['store-name'];
        const apiVersion = req.headers['api-version'];
        const accessToken = req.headers['access-token'];

        if (!storeName || !apiVersion || !accessToken) {
            return res.status(400).json({ error: 'Missing required headers: store-name, api-version, access-token' });
        }

        const url = `https://${storeName}/admin/api/${apiVersion}/customers.json`;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
        };

        const shopifyResponse = await axios.get(url, { headers });
        const shopifyCustomers = shopifyResponse.data.customers;

        if (!shopifyCustomers || shopifyCustomers.length === 0) {
            const allCustomers = await Customer.find();
            return res.status(200).json(allCustomers);
        }

        const existingCustomers = await Customer.find({
            email: { $in: shopifyCustomers.map(c => c.email) }
        });

        const customerMap = new Map(existingCustomers.map(c => [c.email, c]));

        const operations = shopifyCustomers.map(async (shopifyCustomer) => {
            const existingCustomer = customerMap.get(shopifyCustomer.email);

            if (!existingCustomer) {
                return Customer.create(shopifyCustomer);
            } else {
                return Customer.findOneAndUpdate(
                    { email: shopifyCustomer.email },
                    { $set: shopifyCustomer },
                    { upsert: true, new: true }
                );
            }
        });

        await Promise.all(operations);

        const allCustomers = await Customer.find();
        res.status(200).json(allCustomers);

    } catch (error) {
        console.error('🚨 API Error:', error.message);
        res.status(400).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const storeName = req.headers['store-name'];
        const apiVersion = req.headers['api-version'];
        const accessToken = req.headers['access-token'];
        const { email, first_name, last_name, phone, addresses } = req.body;

        if (!storeName || !apiVersion || !accessToken) {
            return res.status(400).json({ error: "Missing required headers" });
        }
        if (!email || !first_name) {
            return res.status(400).json({ error: "First Name and Email are required" });
        }

        const shopifyUrl = `https://${storeName}/admin/api/${apiVersion}/customers.json`;
        const shopifyPayload = { customer: { email, first_name, last_name, phone, addresses } };

        const shopifyResponse = await axios.post(shopifyUrl, shopifyPayload, {
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": accessToken,
            },
        });

        const newCustomer = shopifyResponse.data.customer;

        // Save to MongoDB
        await Customer.create({
            shopifyId: newCustomer.id,
            first_name: newCustomer.first_name,
            last_name: newCustomer.last_name,
            email: newCustomer.email,
            phone: newCustomer.phone,
            addresses: newCustomer.addresses || [],
            created_at: newCustomer.created_at,
        });

        res.status(201).json(newCustomer);
    } catch (error) {
        console.error("🚨 Shopify API Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
});

module.exports = router;