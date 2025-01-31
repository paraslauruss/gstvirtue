const express = require("express");
const Product = require("../models/product"); // Make sure the correct path to the model is used
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');
const bodyParser = require('body-parser');

// // CREATE: Add a new product
// router.post("/", async (req, res) => {
//   try {
//     const { products } = req.body;

//     if (!Array.isArray(products) || products.length === 0) {
//       return res
//         .status(400)
//         .json({
//           message: "Products must be an array with at least one product.",
//         });
//     }

//     const processedProducts = [];

//     for (const product of products) {
//       const { id, title, gst, hsnCode, miniAmount, miniGst, cess } = product;

//       // Validate the ID format (must be numeric)
//       if (!id || isNaN(id)) {
//         return res
//           .status(400)
//           .json({
//             message: `Invalid product ID format for product: ${title}. ID must be numeric.`,
//           });
//       }

//       // Validate the title field
//       if (!title || title.trim() === "") {
//         return res
//           .status(400)
//           .json({ message: `Title is required for product ID: ${id}` });
//       }

//       console.log(`Processing product with ID: ${id}, Title: ${title}`);

//       // Upsert logic: if the product exists, update it; otherwise, insert it.
//       const updatedProduct = await Product.findOneAndUpdate(
//         { id }, // Find by product ID
//         { title, gst, hsnCode, miniAmount, miniGst, cess }, // Fields to update
//         { new: true, upsert: true, setDefaultsOnInsert: true }, // Upsert options
//       );

//       console.log("Upserted product:", updatedProduct);
//       processedProducts.push(updatedProduct);
//     }

//     res.status(200).json({
//       message: "Products processed successfully",
//       products: processedProducts,
//     });
//   } catch (error) {
//     console.error("Error processing products:", error.message);
//     res
//       .status(500)
//       .json({ message: "Failed to process products", error: error.message });
//   }
// });
// // READ: Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// });

// // READ: Get a single product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const identifier = req.params.id;

//     // Check if the identifier is a valid ObjectId
//     const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

//     // Query based on _id (ObjectId) or id (string)
//     const query = isObjectId
//       ? { _id: identifier } // If it's a valid ObjectId, query by _id
//       : { id: identifier }; // Otherwise, query by id field

//     console.log(`Fetching product with query:`, query);

//     const product = await Product.findOne(query);

//     if (product) {
//       res.json({ success: true, title: product.title });
//     } else {
//       res.status(404).json({ success: false, message: "Product not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });
// // UPDATE: Update an existing product
// router.put("/:id", async (req, res) => {
//   const productId = req.params.id;
//   console.log("Received update request for ID:", productId);

//   // Validate the ID format - FIX
//   if (!productId || !/^\d+$/.test(productId)) {
//     return res
//       .status(400)
//       .json({
//         message: "Invalid product ID format. ID must be a numeric string.",
//       });
//   }

//   try {
//     const updatedProduct = await Product.findOneAndUpdate(
//       { id: productId },
//       req.body,
//       { new: true },
//     );

//     console.log("Updated product from db", updatedProduct);
//     if (!updatedProduct) {
//       console.log("Product not found in db for id", productId);
//       return res
//         .status(404)
//         .send({ message: `Product not found for id: ${productId}` });
//     }
//     res.send(updatedProduct);
//   } catch (error) {
//     console.error("Error updating product", error);
//     res.status(500).send({ message: "Error updating product" });
//   }
// });

// module.exports = router;


router.get('/', async (req, res) => {
  try {
      const storeName = req.headers['store-name'];
      const apiVersion = req.headers['api-version'];
      const accessToken = req.headers['access-token'];

      if (!storeName || !apiVersion || !accessToken) {
          return res.status(400).json({ error: 'Missing required headers: store-name, api-version, access-token' });
      }

      const url = `https://${storeName}/admin/api/${apiVersion}/products.json`;
      const headers = {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
      };

      const shopifyResponse = await axios.get(url, { headers });
      const shopifyProducts = shopifyResponse.data.products;

      if (!shopifyProducts || shopifyProducts.length === 0) {
          const allProducts = await Product.find();
          return res.status(200).json(allProducts);
      }

      const existingProducts = await Product.find({
          handle: { $in: shopifyProducts.map(p => p.handle) }
      });


      const productMap = new Map(existingProducts.map(p => [p.handle, p]));


      const operations = shopifyProducts.map(async (shopifyProduct) => {
         const existingProduct = productMap.get(shopifyProduct.handle);

         const productData = {
           id: shopifyProduct.id,
            title: shopifyProduct.title,
            body_html: shopifyProduct.body_html,
            vendor: shopifyProduct.vendor,
            product_type: shopifyProduct.product_type,
            created_at: shopifyProduct.created_at,
            handle: shopifyProduct.handle,
            updated_at: shopifyProduct.updated_at,
            published_at: shopifyProduct.published_at,
            template_suffix: shopifyProduct.template_suffix,
            published_scope: shopifyProduct.published_scope,
            tags: shopifyProduct.tags,
            status: shopifyProduct.status,
            admin_graphql_api_id: shopifyProduct.admin_graphql_api_id,
            variants: shopifyProduct.variants,
            options: shopifyProduct.options,
            images: shopifyProduct.images,
            image: shopifyProduct.image,
            gst: '',
            hsn: '',
            cess: '',
            miniAmount: '',
            minGst: '',
            Amount: ''
         }

         if (!existingProduct) {
             return Product.create(productData);
         } else {
             return Product.findOneAndUpdate(
                 { handle: shopifyProduct.handle },
                 { $set: productData },
                 { upsert: true, new: true }
             );
         }
      });

      await Promise.all(operations);

      const allProducts = await Product.find();
      res.status(200).json(allProducts);

  } catch (error) {
      console.error('🚨 API Error:', error);
      res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
      const storeName = req.headers['store-name'];
      const apiVersion = req.headers['api-version'];
      const accessToken = req.headers['access-token'];
      const { id, gst, hsn, cess, miniAmount, minGst, Amount, ...otherProductDetails } = req.body;

      if (!storeName || !apiVersion || !accessToken) {
          return res.status(400).json({ error: "Missing required headers" });
      }
      if (!id) {
          return res.status(400).json({ error: "Product ID is required" });
      }

      // Check if product exists in MongoDB
      let product = await Product.findOne({ id });

      if (product) {
          // Update only the specified fields
          product.gst = gst || product.gst;
          product.hsn = hsn || product.hsn;
          product.cess = cess || product.cess;
          product.miniAmount = miniAmount || product.miniAmount;
          product.minGst = minGst || product.minGst;
          product.Amount = Amount || product.Amount;
          product.updatedAt = new Date();

          await product.save();
          return res.status(200).json({ message: "Product updated successfully", product });
      } else {
          // Fetch product from Shopify API
          const shopifyUrl = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/products/${id}.json`;

          const shopifyResponse = await axios.get(shopifyUrl, {
              headers: {
                  "Content-Type": "application/json",
                  "X-Shopify-Access-Token": accessToken,
              },
          });

          const shopifyProduct = shopifyResponse.data.product;

          if (!shopifyProduct) {
              return res.status(404).json({ error: "Product not found in Shopify" });
          }

          // Create new product in MongoDB
          const newProduct = await Product.create({
              id: shopifyProduct.id,
              title: shopifyProduct.title,
              body_html: shopifyProduct.body_html,
              vendor: shopifyProduct.vendor,
              product_type: shopifyProduct.product_type,
              created_at: shopifyProduct.created_at,
              updated_at: shopifyProduct.updated_at,
              handle: shopifyProduct.handle,
              published_at: shopifyProduct.published_at,
              template_suffix: shopifyProduct.template_suffix,
              published_scope: shopifyProduct.published_scope,
              tags: shopifyProduct.tags,
              status: shopifyProduct.status,
              admin_graphql_api_id: shopifyProduct.admin_graphql_api_id,
              variants: shopifyProduct.variants,
              options: shopifyProduct.options,
              images: shopifyProduct.images,
              image: shopifyProduct.image,
              gst: gst || "",
              hsn: hsn || "",
              cess: cess || "",
              miniAmount: miniAmount || "",
              minGst: minGst || "",
              Amount: Amount || "",
              createdAt: new Date(),
              updatedAt: new Date()
          });

          return res.status(201).json({ message: "Product added successfully", product: newProduct });
      }
  } catch (error) {
      console.error("🚨 Error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});
module.exports = router;

