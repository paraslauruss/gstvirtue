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

router.post('/', async (req, res) => {
    try {
        const customers = req.body; // Expecting an array of customer objects

        const storeName = 'gst-virtue-paras'; // Replace with your Shopify store name
        const apiVersion = '2025-01'; // Replace with the correct API version
        const accessToken = 'shpua_649d3ab48e3b42cbc6c31b5bd9ad8e89'; // Replace with your Shopify access token

        const url = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/customers.json`;

        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
        };
        axios
            .get(url, { headers })
            .then(response => {
                console.log('Response:', response.data);
                res.status(201).json(response.data);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });

        // if (!Array.isArray(customers)) {
        //     return res.status(400).json({ error: "Request body should be an array of customers." });
        // }

        // // Find the latest customer ID and increment it for new customers
        // const lastCustomer = await Customer.findOne().sort({ id: -1 });
        // let nextId = lastCustomer ? lastCustomer.id + 1 : 1;

        // // Assign unique IDs to each customer
        // const customersWithIds = customers.map(customer => ({
        //     ...customer,
        //     id: nextId++
        // }));

        // const newCustomers = await Customer.insertMany(customersWithIds); // Bulk insert
        // Respond with the created customers
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// geet

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find(); // Fetch all customers from the database
        res.status(200).json(customers); // Respond with the customer data
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;