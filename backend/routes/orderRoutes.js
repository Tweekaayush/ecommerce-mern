const express = require('express')
const { addOrderItems, getOrders, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } = require('../controllers/orderController')
const { protected, admin } = require("../middleware/authMiddleware");
const router = express.Router()

router.route('/').post(protected, addOrderItems).get(protected, admin, getOrders)
router.route('/user').get(protected, getMyOrders)
router.route('/:id').get(protected, getOrderById)
router.route('/:id/pay').put(protected, updateOrderToPaid)
router.route('/:id/deliver').put(protected, updateOrderToDelivered)

module.exports = router
