const Order = require("../models/orderModel");
const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");
const { calcPrices } = require("../utils/calcPrices");

exports.addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    let dbOrderItems = [];
    const arr = orderItems.map(async (orderItem) => {
      const p = await Product.findById(orderItem._id);

      if (p) {
        p.countInStock = p.countInStock - orderItem.quantity;

        const updatedP = await p.save();

        return {
          ...orderItem,
          product: updatedP._id,
          price: updatedP.price,
          _id: undefined,
        };
      } else {
        res.status(400);
        throw new Error(
          "One or more order items were not found in the database"
        );
      }
    });

    await Promise.all(arr).then((results) => {
      dbOrderItems = results;
    });

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      user: req.user.id,
      orderItems: dbOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      createdOrder,
    });
  }
});

exports.getMyOrders = asyncHandler(async (req, res) => {
  const paginate = 6;
  const page = Number(req.query.page) || 1;
  const orders = await Order.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(paginate)
    .skip(paginate * (page - 1));
  const count = await Order.countDocuments({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders,
    page,
    totalPages: Math.ceil(count / paginate),
  });
});

exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json({
      success: true,
      order,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  try {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Order not found");
  }
});

exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById(id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

exports.getOrders = asyncHandler(async (req, res) => {
  const paginate = 6;
  const page = Number(req.query.page) || 1;
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("user", "name")
    .limit(paginate)
    .skip(paginate * (page - 1));

  const count = await Order.countDocuments();
  res.status(200).json({
    success: true,
    orders,
    page,
    totalPages: Math.ceil(count / paginate),
  });
});
