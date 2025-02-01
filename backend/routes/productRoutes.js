const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getTrendingProducts,
  getBestSellingProducts,
  getAllCategories,
  updateProduct,
  deleteProduct,
  createProductReview,
  productsCount,
  createProduct,
} = require("../controllers/productController");
const checkObjectId = require("../middleware/checkObjectId");
const { protected, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protected, admin, createProduct);
router.route("/categories").get(getAllCategories);
router.route("/trending").get(getTrendingProducts);
router.route("/bestselling").get(getBestSellingProducts);
router.route('/count').get(protected, admin, productsCount)
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protected, admin, checkObjectId, updateProduct)
  .delete(protected, admin, checkObjectId, deleteProduct);

router.route('/:id/reviews').post(protected, createProductReview)

module.exports = router;
