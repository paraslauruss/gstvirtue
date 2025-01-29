const express = require("express");
const Product = require("../models/product"); // Make sure the correct path to the model is used
const router = express.Router();
const mongoose = require("mongoose");

// CREATE: Add a new product
router.post("/", async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({
          message: "Products must be an array with at least one product.",
        });
    }

    const processedProducts = [];

    for (const product of products) {
      const { id, title, gst, hsnCode, miniAmount, miniGst, cess } = product;

      // Validate the ID format (must be numeric)
      if (!id || isNaN(id)) {
        return res
          .status(400)
          .json({
            message: `Invalid product ID format for product: ${title}. ID must be numeric.`,
          });
      }

      // Validate the title field
      if (!title || title.trim() === "") {
        return res
          .status(400)
          .json({ message: `Title is required for product ID: ${id}` });
      }

      console.log(`Processing product with ID: ${id}, Title: ${title}`);

      // Upsert logic: if the product exists, update it; otherwise, insert it.
      const updatedProduct = await Product.findOneAndUpdate(
        { id }, // Find by product ID
        { title, gst, hsnCode, miniAmount, miniGst, cess }, // Fields to update
        { new: true, upsert: true, setDefaultsOnInsert: true }, // Upsert options
      );

      console.log("Upserted product:", updatedProduct);
      processedProducts.push(updatedProduct);
    }

    res.status(200).json({
      message: "Products processed successfully",
      products: processedProducts,
    });
  } catch (error) {
    console.error("Error processing products:", error.message);
    res
      .status(500)
      .json({ message: "Failed to process products", error: error.message });
  }
});
// READ: Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// READ: Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const identifier = req.params.id;

    // Check if the identifier is a valid ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    // Query based on _id (ObjectId) or id (string)
    const query = isObjectId
      ? { _id: identifier } // If it's a valid ObjectId, query by _id
      : { id: identifier }; // Otherwise, query by id field

    console.log(`Fetching product with query:`, query);

    const product = await Product.findOne(query);

    if (product) {
      res.json({ success: true, title: product.title });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// UPDATE: Update an existing product
router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  console.log("Received update request for ID:", productId);

  // Validate the ID format - FIX
  if (!productId || !/^\d+$/.test(productId)) {
    return res
      .status(400)
      .json({
        message: "Invalid product ID format. ID must be a numeric string.",
      });
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      req.body,
      { new: true },
    );

    console.log("Updated product from db", updatedProduct);
    if (!updatedProduct) {
      console.log("Product not found in db for id", productId);
      return res
        .status(404)
        .send({ message: `Product not found for id: ${productId}` });
    }
    res.send(updatedProduct);
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).send({ message: "Error updating product" });
  }
});

module.exports = router;
