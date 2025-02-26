const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    payees: { type: String, required: true },
    expenseDate: String,
    status: String,
    paymentMethod: String,
    RefNumber: String,
    totalTax: Number,
    total: Number,
  });

module.exports = mongoose.model('Expense', expenseSchema);