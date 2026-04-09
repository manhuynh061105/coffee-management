const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    items: [
        {
            "productId": String,
            "quantity": Number
        }
    ],
    total: Number,
    status: {
        type: String,
        default: 'pending'
    }
});

module.exports = mongoose.model('Order', orderSchema);