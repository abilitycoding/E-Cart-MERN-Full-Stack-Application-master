const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true,
    enum: [
      "laptop",
      "mobile",
      "desktop",
      "tablet",
      "mens",
      "womans",
      "kids",
      "fashion-sale"
    ]
  },
  productQuantity: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
