const mongoose = require("mongoose");

const EstimateSchema = new mongoose.Schema({
    Estimatenum: { type: String, default: null },
    estDate: {
    type: Date,
    required: true,
  },
  ExpiryDate: {
    type: Date,
    required: true,
  },
  Customer: {
    type: String,
  },
  totalTax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  items: [
    {
      title: { type: String },
      hsn: { type: String },
      gst: { type: String },
      cess: { type: String }
    }
  ],
 
});

module.exports = mongoose.model("Estimate", EstimateSchema);
