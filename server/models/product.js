const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    gst: { type: Number, default: 5 },
    hsnCode: { type: String, default: '000000' },
    miniAmount: { type: Number, default: 100 },
    miniGst: { type: Number, default: 5 },
    cess: { type: Number, default: 0 },
}, { timestamps: false });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;