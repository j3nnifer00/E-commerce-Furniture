const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema (
    {
        orderItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: true
        }],
        user: {
            id: {type: String},
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: {
                shippingAddress1: {
                    type: String,
                    required: true
                },
                shippingAddress2: {
                    type: String
                },
                city: {
                    type: String,
                    required: true
                },
                state: {
                    type: String,
                    required: true
                },
                zip: {
                    type: String,
                    required: true
                },
                country: {
                    type: String,
                    required: true
                }
            },
          },
        totalPrice: { type: Number, required: true },
        paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Bank Transfer"], required: true },
        status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
        dateOrdered: {
            type: Date,
            default: Date.now
        },
    }
);

// virtual id
orderSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true
})

exports.Order = mongoose.model('Order', orderSchema);