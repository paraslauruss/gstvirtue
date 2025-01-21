const express = require("express");
const { Shopify } = require("@shopify/shopify-api");

const app = express();
const PORT = process.env.PORT || 3001;

// Shopify configuration
const shopify = new Shopify({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ["read_products", "write_products"],
  shop: process.env.SHOPIFY_SHOP,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

// API route example
app.get("/api/products", async (req, res) => {
  try {
    const products = await shopify.rest.Product.all();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});