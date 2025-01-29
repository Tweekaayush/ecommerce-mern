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
} = require("../controllers/productController");
const checkObjectId = require("../middleware/checkObjectId");
const { protected, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts);
router.route("/categories").get(getAllCategories);
router.route("/trending").get(getTrendingProducts);
router.route("/bestselling").get(getBestSellingProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protected, admin, checkObjectId, updateProduct)
  .delete(protected, admin, checkObjectId, deleteProduct);

router.route('/:id/reviews').post(protected, createProductReview)

module.exports = router;
