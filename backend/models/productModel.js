// Required Packages
const mongoose = require("mongoose");

// Create schema object
const Schema = mongoose.Schema;

// Define the schema structure
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    richDescription: {
      type: String
    },
    image: {
      type: String
    },
    images: {
      type: []
    },
    brand: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 1000
    },
    rating: {
      type:Number
    },
    numReviews: {
      type: Number
    },
    isFeatured: {
      type: Boolean
    }
  },
  { timestamps: true } // Keep track of when product is registered
);

// Export as a collection based on the productschema
module.exports = mongoose.model("Product", productSchema);
