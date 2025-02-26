const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');


// Middleware to verify required headers
const verifyHeaders = (req, res, next) => {
    const apiVersion = req.headers['api-version'];
    const storeName = req.headers['store-name'];
    const accessToken = req.headers['access-token'];
  
    next();
};

// Apply the verifyHeaders middleware to all routes in this router
router.use(verifyHeaders);

// GET all expenses
router.get('/', async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST a new expense
  router.post('/', async (req, res) => {
    const expense = new Expense({
      payees: req.body.payees,
      expenseDate: req.body.expenseDate,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
      RefNumber: req.body.RefNumber,
      totalTax: req.body.totalTax,
      total: req.body.total,
    });
  
    try {
      const newExpense = await expense.save();
      res.status(201).json(newExpense); // 201 Created
    } catch (err) {
      res.status(400).json({ message: err.message }); // 400 Bad Request
    }
  });
  
  // GET a single expense by ID
  router.get('/:id', async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' }); // 404 Not Found
      }
      res.json(expense);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // PUT an  expense
  router.put('/:id', getExpesnse, async (req, res) => {
    if (req.body.payees != null) {
      req.expense.payees = req.body.payees;
    }
    if (req.body.expenseDate != null) {
      req.expense.expenseDate = req.body.expenseDate;
    }
    if (req.body.status != null) {
      req.expense.status = req.body.status;
    }
    if (req.body.paymentMethod != null) {
      req.expense.paymentMethod = req.body.paymentMethod;
    }
    if (req.body.RefNumber != null) {
      req.expense.RefNumber = req.body.RefNumber;
    }
    if (req.body.totalTax != null) {
      req.expense.totalTax = req.body.totalTax;  //Fixed: totalTax is a property of the expense, not bill
    }
    if (req.body.total != null) {
      req.expense.total = req.body.total;  //Fixed: total is a property of the expense, not bill
    }
  
    try {
      const updatedExpense = await req.expense.save();
      res.json(updatedExpense);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// DELETE an expense
router.delete('/:id', getExpesnse, async (req, res) => {
  try {
      if (!req.expense) { // Corrected condition: Check req.expense
        return res.status(404).json({ message: 'Expense not found' });
      }
      await req.expense.deleteOne(); // Mongoose syntax to delete the document
      res.json({ message: 'Deleted Expense' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
  async function getExpesnse(req, res, next) {
    let expense;
    try {
        expense = await Expense.findById(req.params.id);
        if (expense === null) {
            return res.status(404).json({ message: 'Cannot find expense' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    req.expense = expense; 
    next(); 
  }

  module.exports = router;