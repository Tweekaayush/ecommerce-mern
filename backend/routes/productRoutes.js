const express = require('express')
const router = express.Router()
const {getProducts, getProductById, getTrendingProducts, getBestSellingProducts, getAllCategories} = require('../controllers/productController')
const checkObjectId = require('../middleware/checkObjectId')


router.route('/').get(getProducts)
router.route('/categories').get(getAllCategories)
router.route('/trending').get(getTrendingProducts)
router.route('/bestselling').get(getBestSellingProducts)
router.route('/:id').get(checkObjectId, getProductById)


module.exports = router