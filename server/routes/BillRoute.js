const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Middleware to verify required headers
const verifyHeaders = (req, res, next) => {
    const apiVersion = req.headers['api-version'];
    const storeName = req.headers['store-name'];
    const accessToken = req.headers['access-token'];
  
    next();
};

// Apply the verifyHeaders middleware to all routes in this router
router.use(verifyHeaders);

// Get all bills
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new bill
router.post('/', async (req, res) => {
    const bill = new Bill({
        billNumber: req.body.billNumber,
        payeeVendor: req.body.payeeVendor,
        billDate: req.body.billDate,
        dueDate: req.body.dueDate,
        totalTax: req.body.totalTax,
        total: req.body.total,
        paymentTerms: req.body.paymentTerms,
    });

    try {
        const newBill = await bill.save();
        res.status(201).json(newBill);
    } catch (err) {
        console.error('Error creating bill:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get one bill
router.get('/:id', getBill, (req, res) => {
    res.json(res.bill);
});

// Update a bill
router.put('/:id', getBill, async (req, res) => {
    if (req.body.billNumber != null) {
        res.bill.billNumber = req.body.billNumber;
    }
    if (req.body.payeeVendor != null) {
        res.bill.payeeVendor = req.body.payeeVendor;
    }
    if (req.body.billDate != null) {
        res.bill.billDate = req.body.billDate;
    }
    if (req.body.dueDate != null) {
        res.bill.dueDate = req.body.dueDate;
    }
    if (req.body.totalTax != null) {
        res.bill.totalTax = req.body.totalTax;
    }
    if (req.body.total != null) {
        res.bill.total = req.body.total;
    }
    if (req.body.paymentTerms != null) {
        res.bill.paymentTerms = req.body.paymentTerms;
    }

    try {
        const updatedBill = await res.bill.save();
        res.json(updatedBill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a bill
router.delete('/:id', getBill, async (req, res) => {
    try {
        if (!res.bill) {
          return res.status(404).json({ message: 'bill not found' });
        }
        await res.bill.deleteOne(); // Mongoose syntax to delete the document
        res.json({ message: 'Deleted Bill' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

async function getBill(req, res, next) {
    let bill;
    try {
        bill = await Bill.findById(req.params.id);
        if (bill == null) {
            return res.status(404).json({ message: 'Cannot find bill' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.bill = bill;
    next();
}

module.exports = router;