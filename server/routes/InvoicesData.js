const express = require('express');
const router = express.Router();
const invoiceData = require('../models/invoiceData'); // Make sure the path is correct

// Middleware to verify required headers
const verifyHeaders = (req, res, next) => {
    const apiVersion = req.headers['api-version'];
    const storeName = req.headers['store-name'];
    const accessToken = req.headers['access-token'];

    //Add you custom logic here to verify the header for exemple
    // if (!apiVersion || !storeName || !accessToken) {
    //     return res.status(400).json({ message: 'Missing required headers' });
    // }
    // Add more sophisticated validation logic here if needed

    next();
};

// Apply verifyHeaders middleware to all routes in the router
router.use(verifyHeaders);

// GET all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await invoiceData.find();
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific invoice by ID
router.get('/:id', async (req, res) => {
    try {
        const invoice = await invoiceData.findById(req.params.id); // Use invoiceData here
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new invoice
router.post('/', async (req, res) => {
    const invoice = new invoiceData({ // Use invoiceData here (it's the model constructor)
        invoiceNumber: req.body.invoiceNumber,
        customerName: req.body.customerName,
        invoiceDate: req.body.invoiceDate,
        dateOfSupply: req.body.dateOfSupply,
        totalTax: req.body.totalTax,
        Status: req.body.Status,
        total: req.body.total,
    });

    try {
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an existing invoice by ID
router.put('/:id', async (req, res) => {
    try {
        const invoice = await invoiceData.findById(req.params.id); // Use invoiceData here
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        invoice.invoiceNumber = req.body.invoiceNumber || invoice.invoiceNumber; // Use existing value if not provided
        invoice.customerName = req.body.customerName || invoice.customerName;
        invoice.invoiceDate = req.body.invoiceDate || invoice.invoiceDate;
        invoice.dateOfSupply = req.body.dateOfSupply || invoice.dateOfSupply;
        invoice.totalTax = req.body.totalTax || invoice.totalTax;
        invoice.Status = req.body.Status || invoice.Status;
        invoice.total = req.body.total || invoice.total;

        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an invoice by ID
router.delete('/:id', async (req, res) => {
    try {
        const invoice = await invoiceData.findById(req.params.id); // Use invoiceData here
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        await invoice.deleteOne();
        res.json({ message: 'Invoice deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;