const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: {
        name: String,
        phone: String,
        address: String
    },
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number
    }],
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);