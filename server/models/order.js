const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: false,  //Not required it anymore
        unique: false,     // This is the important change!
        default: null      // Allow null values
    },
    order_number: { type: Number, required: true, unique: true }, // Ensure uniqueness
    invoice_number: { type: String },
    date: { type: Date, required: true },
    customer_name: { type: String },
    total_price: { type: Number, required: true },
    order_status_url: { type: String, default: '' },
    fulfillment_status: { type: String, default: 'Unfulfilled' },
    email: { type: String, required: true },
    user_id: { type: Number, default: null },
    store_name: { type: String, required: true },
    payment_status: {  // Add the payment_status field
        type: String,
        required: false,
        default: 'pending'  // You can set a default value if you want
    }
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;