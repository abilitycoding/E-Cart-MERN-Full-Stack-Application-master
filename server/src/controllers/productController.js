const Product = require("../models/productModal");
const getProduct = async (req, res) => {
  try {
    const query = req.query.query;
    let products;

    if (query) {
      // Assuming you're using Mongoose and your product model has a 'name' field
      products = await Product.find({
        productName: { $regex: query, $options: "i" },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({
      message: "Products fetched successfully",
      products: products,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getProductCategory = async (req, res) => {
  try {
    const { productCategory } = req.body;
    const products = await Product.find({ productCategory });
    res.status(200).json({
      message: "Products fetched successfully",
      products: products,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const createProduct = async (req, res) => {
  console.log(req.body);
  //   return;
  const product = new Product(req.body);
  console.log(product);
  try {
    const savedProduct = await product.save();
    res.status(201).json({
      message: "Product saved successfully",
      savedProduct: savedProduct,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateProduct = async (req, res) => {
  console.log("Product Update: ", req.body);
  const {
    _id,
    productName,
    productPrice,
    productDescription,
    productImage,
    productCategory,
    productQuantity,
  } = req.body;

  const updateProduct = await Product.findByIdAndUpdate(
    _id,
    {
      productName,
      productPrice,
      productDescription,
      productImage,
      productCategory,
      productQuantity,
    },
    { new: true }
  );

  if (updateProduct) {
    res.status(200).json({
      message: "Product Updated Successfully",
      updateProduct: updateProduct,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("Id to delete: ", id);

    await Product.findByIdAndDelete(id);

    const updatedProducts = await Product.find();

    return res
      .status(200)
      .json({ message: "Deleted Success", updatedProducts: updatedProducts });
  } catch (error) {
    return res.status(500).json({ message: "Error in Server..." });
  }
};

module.exports = {
  getProduct,
  getProductCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
