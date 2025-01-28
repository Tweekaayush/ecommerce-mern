const Order = require('../models/orderModel')
const asyncHandler = require('../middleware/asyncHandler')

exports.addOrderItems = asyncHandler(async(req, res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
    }else{
        const order = new Order({
            user: req.user.id,
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json({
            success: true,
            createdOrder
        })
    }
})


exports.getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user.id})
    res.status(200).json({
        success: true,
        orders
    })
})

exports.getOrderById = asyncHandler(async(req, res)=>{

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.status(200).json({
            success: true,
            order
        })
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

exports.updateOrderToPaid = asyncHandler(async(req, res)=>{
    res.send('update order to paid')
})

exports.updateOrderToDelivered = asyncHandler(async(req, res)=>{
    
    const id = req.params.id

    const order = await Order.findById(id)

    if(order){
        order.isDelivered = true

        const updatedOrder = await order.save()
        res.status(200).json({
            success: true,
            order: updatedOrder
        })
    }else{
        res.status(404)
        throw new Error('Order not found')
    }


    // res.send('update order to delivered')
})

exports.getOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({}).populate('user', 'name')
    res.status(200).json({
        success: true,
        orders
    })
})

