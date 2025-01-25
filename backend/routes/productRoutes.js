const express = require('express')
const products = require('../data/products')
const router = express.Router()
const {getProducts, getProductById} = require('../controllers/productController')



router.route('/products').get(getProducts)
router.route('/products/:id').get(getProductById)


module.exports = router