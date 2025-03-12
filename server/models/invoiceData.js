const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true },  // Example: required field
    customerName: String,
    invoiceDate: String,
    dateOfSupply: String,
    totalTax: { type: Number, required: true },    // Corrected: totalTax (lowercase "t")
    Status: { type: String, required: true },      // Corrected: Status (uppercase "S")
    total: Number
  });
  
  // Create Invoice Model
  const Invoice = mongoose.model('Invoice', invoiceSchema);
  module.exports = Invoice;