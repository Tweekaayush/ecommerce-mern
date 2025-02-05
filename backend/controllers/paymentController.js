const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('../middleware/asyncHandler')

exports.checkout = asyncHandler(async (req, res) => {
  const { order, email } = req.body;
  const taxPerProduct = (order.taxPrice / order.orderItems.length).toFixed(2);

  const line_items = order.orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // images: [item.image]
        },
        unit_amount: (item.price + taxPerProduct / item.quantity) * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "hosted",
    success_url: `${process.env.CLIENT_URL}/success/${order._id}`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
    line_items: line_items,
    payment_method_types: ["card"],
    customer_email: email,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: order.shippingPrice * 100,
            currency: "usd",
          },
          display_name: "Shipping Price",
          tax_behavior: "exclusive",
          tax_code: "txcd_92010001",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
  });
  res.json({ session_id: session.id, url: session.url });
});
