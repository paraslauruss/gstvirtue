const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
});

const CustomerSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    companyName: { type: String },
    gstNumber: { type: String, required: true, unique: true },
    address: { type: AddressSchema, required: true },
}, { timestamps: false });

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;