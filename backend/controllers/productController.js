const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const paginate = 6;
  const page = Number(req.query.page) || 1;
  const category = req.query.category ? { category: req.query.category } : {};

  const count = await Product.countDocuments(category);

  const products = await Product.find(category)
    .limit(paginate)
    .skip(paginate * (page - 1));
  res.status(200).json({
    success: true,
    products,
    page,
    totalPages: Math.ceil(count / paginate),
  });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  res.status(200).json({
    success: true,
    categories,
  });
});

// @desc    Fetch a product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found!");
  }
});

exports.getTrendingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(6);
  res.json(products);
});

exports.getBestSellingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ numReviews: 1 }).limit(6);
  res.json(products);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, brand, category, countInStock } = req.body;
  const product = await Product.findById(id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(201).json({
      success: true,
      product: updatedProduct,
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

exports.deleteProduct = asyncHandler(async(req, res)=>{
  console.log(req.params.id)
  const product = await Product.findById(req.params.id)
  // return res.json({})
  if(product){

    await Product.deleteOne({_id: product._id})

    res.status(200).json({
      success:true,
      message: 'Product deleted'
    })
  }else{
    res.status(404)
    throw new Error('Resource not found')
  }
})