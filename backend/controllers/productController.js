const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");
// const cloudinary = require("cloudinary");

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
      message: "Product Updated!",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock, image } =
    req.body; 

  // const uploadResult = await cloudinary.uploader.upload(image, {
  //   folder: "products",
  // });

  if (uploadResult) {
    const product = new Product({
      name,
      price,
      description,
      brand,
      category,
      countInStock,
      // image: uploadResult.url,
      user: req.user.id,
      numReviews: 0,
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      product: createdProduct,
      message: "Product Created!",
    });
  }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });

    res.status(200).json({
      success: true,
      message: "Product deleted!",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed!");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user.id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((a, c) => a + c.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

exports.productsCount = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments({});

  if (productCount) {
    res.status(200).json({
      success: true,
      productCount,
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
