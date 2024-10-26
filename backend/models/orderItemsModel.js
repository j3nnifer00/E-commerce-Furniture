const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderItemsSchema = new Schema (
    {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }
    }
)

exports.OrderItem = mongoose.model('OrderItem', orderItemsSchema);