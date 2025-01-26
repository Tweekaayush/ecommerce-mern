const express = require('express')
const products = require('../data/products')
const router = express.Router()
const {getProducts, getProductById, getTrendingProducts, getBestSellingProducts} = require('../controllers/productController')
const checkObjectId = require('../middleware/checkObjectId')


router.route('/').get(getProducts)
router.route('/trending').get(getTrendingProducts)
router.route('/bestselling').get(getBestSellingProducts)
router.route('/:id').get(checkObjectId, getProductById)


module.exports = router