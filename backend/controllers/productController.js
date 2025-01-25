const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch a product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);
  console.log(req.params.id)

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found!");
  }

});