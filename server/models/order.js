const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // Assuming each order ID is unique
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    invoiceDate: { type: Date, default: Date.now }, // Changed from orderDate
    items: [
      {
        productName: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalTax: { type: Number },
    totalAmount: { type: Number, required: true },
    paymentMode: { type: String },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Completed",
        "Cancelled",
        "Paid",
        "Unpaid",
      ],
      default: "Pending",
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', orderSchema);
