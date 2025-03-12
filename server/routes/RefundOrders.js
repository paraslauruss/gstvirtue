const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const RefundedOrder = require("../models/RefundedOrder");

const router = express.Router();

router.get("/refunded", async (req, res) => {
  try {
    const storeName = req.headers["store-name"];
    const apiVersion = req.headers["api-version"];
    const accessToken = req.headers["access-token"];

    if (!storeName || !apiVersion || !accessToken) {
      return res.status(400).json({ error: "Missing required headers" });
    }

    const sanitizedStoreName = String(storeName).trim();
    const sanitizedApiVersion = String(apiVersion).trim();

    if (sanitizedStoreName.length > 100 || sanitizedApiVersion.length > 20) {
      return res.status(400).json({ error: "Invalid store-name or api-version" });
    }

    const url = `https://${sanitizedStoreName}/admin/api/${sanitizedApiVersion}/orders.json?financial_status=refunded`;
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    let shopifyRefundedOrders = [];
    try {
      const shopifyResponse = await axios.get(url, { headers });
      shopifyRefundedOrders = shopifyResponse.data.orders || [];
    } catch (shopifyError) {
      console.error(
        " Shopify API Error:",
        shopifyError.response?.data || shopifyError.message,
      );
      return res
        .status(400)
        .json({
          error: "Failed to fetch refunded orders",
          details: shopifyError.message,
        });
    }

    // If no refunded orders from Shopify, return existing ones from the database
    if (shopifyRefundedOrders.length === 0) {
      console.log(
        `No refunded orders found for ${storeName}. Fetching saved orders from DB.`,
      );
      const allRefundedOrders = await RefundedOrder.find().lean();
      return res.status(200).json(allRefundedOrders);
    }

    const bulkOperations = [];
    for (const shopifyRefundedOrder of shopifyRefundedOrders) {
      if (!shopifyRefundedOrder.order_number) {
        console.warn(
          `Skipping refunded order with missing order_number:`,
          shopifyRefundedOrder,
        );
        continue;
      }

      const orderNumber = parseInt(shopifyRefundedOrder.order_number, 10);
      const orderId = shopifyRefundedOrder.id;
      const cn_suffix = generateUniqueSuffix();
      // **Upsert: Insert only if the order does not exist**
      bulkOperations.push({
        updateOne: {
          filter: { order_number: orderNumber }, // Ensure uniqueness
          update: {
            $setOnInsert: {
              order_id: orderId,
              order_number: orderNumber,
              order_date: new Date(shopifyRefundedOrder.created_at)
                .toISOString()
                .split("T")[0],
              customer_name: shopifyRefundedOrder.customer
                ? `${shopifyRefundedOrder.customer.first_name || ""} ${shopifyRefundedOrder.customer.last_name || ""}`.trim()
                : null,
              tax_amount: shopifyRefundedOrder.tax_lines?.[0]?.price || null,
              total_price: parseFloat(shopifyRefundedOrder.total_price) || 0,
              cancellation_date:
                shopifyRefundedOrder.refunds?.[0]?.processed_at || null,
              status: shopifyRefundedOrder.financial_status,
              cn_prefix: "CN", // Default prefix
              cn_suffix: cn_suffix, // Generate suffix
              cn_number: `CN${cn_suffix}`, 
            },
          },
          upsert: true, // Prevent duplicates
        },
      });
    }
    // Execute bulk insert/update operation
    if (bulkOperations.length > 0) {
      try {
        await RefundedOrder.bulkWrite(bulkOperations, { ordered: false });
        console.log(`✅ Synced ${bulkOperations.length} refunded orders.`);
      } catch (dbError) {
        console.error(`❌ Database error during bulk upsert:`, dbError);
      }
    }
    const allRefundedOrders = await RefundedOrder.find().lean({ virtuals: true });
    res.status(200).json(allRefundedOrders);
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// PUT endpoint for updating refunded orders
router.put("/refunded/:order_number", async (req, res) => {
  const { order_number } = req.params;
  const { cancellation_date, cn_prefix, cn_suffix } = req.body;

  try {
    // Find the order by order_number
    const refundedOrder = await RefundedOrder.findOne({
      order_number: order_number,
    });

    if (!refundedOrder) {
      return res.status(404).json({ message: "Refunded order not found" });
    }

    // Update the order fields
    if (cancellation_date !== undefined) {
      refundedOrder.cancellation_date = cancellation_date
        ? new Date(cancellation_date)
        : null;
    }

    // Update CN Prefix and CN Suffix separately
    if (cn_prefix) refundedOrder.cn_prefix = cn_prefix;
    if (cn_suffix) refundedOrder.cn_suffix = cn_suffix;

    // Validate unique cn_suffix before saving
    if (cn_suffix) {
      const existingOrderWithCN = await RefundedOrder.findOne({
        cn_suffix: cn_suffix,
        order_number: { $ne: order_number },
      });
      if (existingOrderWithCN) {
        return res
          .status(400)
          .json({ message: "Credit Note Suffix already exists" });
      }
    }

    await refundedOrder.save();
    res.json({ message: "Order updated successfully", refundedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

function generateUniqueSuffix() {
  return Math.floor(100000 + Math.random() * 900000);
}


module.exports = router;
