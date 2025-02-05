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
            // gst: '',
            // hsnCode: '',
            // cess: '',
            // miniAmount: '',
            // minGst: '',
            // Amount: ''
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
    const storeName = req.headers["store-name"];
    const apiVersion = req.headers["api-version"];
    const accessToken = req.headers["access-token"];
    let { id, gst, hsn, cess, miniAmount, minGst } = req.body;

    console.log("Received request with body:", req.body);

    // Validate required headers
    if (!storeName || !apiVersion || !accessToken) {
      return res.status(400).json({ error: "Missing required headers" });
    }

    // Validate and extract the numeric product ID
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const numericId = id.replace("gid://shopify/Product/", ""); // Extracts the numeric ID
    console.log("🔎 Searching product with id:", numericId);

    // Check if product exists in MongoDB
    let product = await Product.findOne({ id: numericId });

    if (product) {
      // Update only the specified fields if they exist
      let updateFields = {
        gst: gst !== undefined ? gst.toString() : product.gst,
        hsn: hsn !== undefined ? hsn: product.hsn,
        cess: !isNaN(parseFloat(cess)) ? parseFloat(cess) : product.cess,
        miniAmount: !isNaN(parseFloat(miniAmount)) ? parseFloat(miniAmount) : product.miniAmount,
        minGst: !isNaN(parseFloat(minGst)) ? parseFloat(minGst) : product.minGst,
        updatedAt: new Date(), // Update timestamp
      };
     
      console.log("🔄 Updating fields:", updateFields);
      console.log("Updating product with id:", numericId);
      // Use findOneAndUpdate for reliability
      let updatedProduct = await Product.findOneAndUpdate(
        { id: numericId },
        { $set: updateFields },
        { new: true, runValidators: true }
      );

      console.log("✅ Updated Product:", updatedProduct);
      return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    }

    // If product doesn't exist, fetch from Shopify
    console.log(`❌ Product not found in MongoDB. Fetching from Shopify...`);    
    const shopifyUrl = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/products/${numericId}.json`;

    try {
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

      // Insert new product in MongoDB
      console.log("🆕 Adding New Product:", shopifyProduct.title);
      const newProduct = await Product.create({
        id: numericId, // Store numeric ID
        title: shopifyProduct.title,
        gst: gst ? gst.toString() : "",
        hsn: hsn || "",
        cess: !isNaN(parseFloat(cess)) ? parseFloat(cess) : null,
        miniAmount: !isNaN(parseFloat(miniAmount)) ? parseFloat(miniAmount) : null,
        minGst: !isNaN(parseFloat(minGst)) ? parseFloat(minGst) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        // id: numericId, // Save numeric ID in MongoDB
        // title: shopifyProduct.title,
        // body_html: shopifyProduct.body_html,
        // vendor: shopifyProduct.vendor,
        // product_type: shopifyProduct.product_type,
        // created_at: shopifyProduct.created_at,
        // updated_at: shopifyProduct.updated_at,
        // handle: shopifyProduct.handle,
        // published_at: shopifyProduct.published_at,
        // template_suffix: shopifyProduct.template_suffix,
        // published_scope: shopifyProduct.published_scope,
        // tags: shopifyProduct.tags,
        // status: shopifyProduct.status,
        // admin_graphql_api_id: shopifyProduct.admin_graphql_api_id,
        // variants: shopifyProduct.variants,
        // options: shopifyProduct.options,
        // images: shopifyProduct.images,
        // image: shopifyProduct.image,
        // gst: gst ? gst.toString() : "", // Ensure gst is a string
        // hsn: hsn || "",
        // cess: typeof cess !== "undefined" ? parseFloat(cess) : null,
        // miniAmount: typeof miniAmount !== "undefined" ? parseFloat(miniAmount) : null,
        // minGst: typeof minGst !== "undefined" ? parseFloat(minGst) : null,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      });

      console.log("Product added successfully:", newProduct);
      return res.status(201).json({ message: "Product added successfully", product: newProduct });
    } 

    catch (shopifyError) {
      console.error("Shopify API Error:", shopifyError.response?.data || shopifyError.message);

      return res.status(shopifyError.response?.status || 500).json({
        error: shopifyError.response?.data || "Error fetching product from Shopify",
      });
    }
  } catch (error) {
    console.error("Unexpected Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to get single product with id
router.get('/:productId', async (req, res) => {
  try {
      const storeName = req.headers['store-name'];
      const apiVersion = req.headers['api-version'];
      const accessToken = req.headers['access-token'];
      const productId = req.params.productId;  // Get the product ID from the URL parameters

      if (!storeName || !apiVersion || !accessToken) {
          return res.status(400).json({ error: 'Missing required headers: store-name, api-version, access-token' });
      }

      if (!productId) {
          return res.status(400).json({ error: 'Product ID is required' });
      }

      // Try to find the product in MongoDB first
      const existingProduct = await Product.findOne({ id: productId });

      if (existingProduct) {
          // Product found in MongoDB, return it
          return res.status(200).json(existingProduct);
      }

      // If product not found in MongoDB, try to fetch it from Shopify
      const shopifyUrl = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/products/${productId}.json`;

      try {
          const shopifyResponse = await axios.get(shopifyUrl, {
              headers: {
                  'Content-Type': 'application/json',
                  'X-Shopify-Access-Token': accessToken,
              }
          });

          const shopifyProduct = shopifyResponse.data.product;

          if (!shopifyProduct) {
              return res.status(404).json({ error: 'Product not found in Shopify' });
          }

          // Construct the product data from Shopify and save to MongoDB
          const newProduct = new Product({
              id: productId,
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
              gst:shopifyProduct.gst || '',
              hsn: shopifyProduct.hsn || "",
              cess: shopifyProduct.cess || '',
              
              // you may have to add other properties here to be saved to MongoDB
          });

          await newProduct.save();

          return res.status(200).json(newProduct);
      } catch (shopifyError) {
          console.error('🚨 Shopify API Error:', shopifyError);
          return res.status(500).json({ error: 'Error fetching product from Shopify', details: shopifyError.message });
      }

  } catch (error) {
      console.error('🚨 API Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;

