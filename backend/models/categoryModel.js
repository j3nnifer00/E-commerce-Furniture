const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        colour: {
            type: String //hex string
        },
        icon: {
            type: String
        }
    }
);

exports.Category = mongoose.model('Category', categorySchema);