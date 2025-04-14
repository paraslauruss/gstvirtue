const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  billNumber: { type: String, required: true },
  payeeVendor: { type: String, required: true },
  billDate: { type: Date, required: true },
  dueDate: { type: Date },
  totalTax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  totalShippingCharge: { type: Number, default: 0 },
  paymentTerms: { type: String, default: "Net 30" },
  productId: { type: String, required: true },
});

module.exports = mongoose.model('Bill', billSchema);