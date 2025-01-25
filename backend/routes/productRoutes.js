const express = require('express')
const products = require('../data/products')
const router = express.Router()
const {getProducts, getProductById, getTrendingProducts, getBestSellingProducts} = require('../controllers/productController')
const checkObjectId = require('../middleware/checkObjectId')


router.route('/products').get(getProducts)
router.route('/products/trending').get(getTrendingProducts)
router.route('/products/bestselling').get(getBestSellingProducts)
router.route('/products/:id').get(checkObjectId, getProductById)


module.exports = router