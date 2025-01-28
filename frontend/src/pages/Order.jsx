import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById, updateOrderToDelivered } from "../slices/orderSlice";

const OrderItem = (props) => {
  const { _id, name, brand, image, quantity, price } = props;

  return (
    <div className="checkout-cart-item">
      <div className="checkout-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="checkout-item-info">
        <h4 className="ellipses-2">{name}</h4>
        <h6>Brand: {brand}</h6>
      </div>

      <p>${price}</p>
      <div className="checkout-item-quantity">{quantity}</div>
      <p>${price * quantity}</p>
    </div>
  );
};

const Order = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    orderDetails: {
      shippingAddress,
      isDelivered,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentMethod,
      isPaid,
      paidAt,
      deliveredAt
    },
  } = useSelector((state) => state.orders.data);

  const { user: {isAdmin} } = useSelector((state) => state.user.data);

  const deliverOrder = () =>{
    dispatch(updateOrderToDelivered(id))
  }

  useEffect(() => {
    dispatch(getOrderById(id));
  }, []);

  return (
    <section id="order">
      <div className="container">
        <div className="order-container">
          <div className="shipping-address">
            <h1 className="heading-3">Shipping Address</h1>
            <p className="body-text-1">
              {shippingAddress?.address}, {shippingAddress?.postalCode},
              <br />
              {shippingAddress?.city}, {shippingAddress?.country}
            </p>
            <p className={`status ${isDelivered ? "true" : false}`}>
              {isDelivered ? `Delivered on ${deliveredAt}` : "Not Delivered"}
            </p>
          </div>
          <div className="order-payment">
            <h1 className="heading-3">Payment Method</h1>
            <h4>Method: {paymentMethod}</h4>
            <p className={`status ${isPaid ? "true" : false}`}>
              {isPaid ? "Paid" : "Not Paid"}
            </p>
          </div>

          <div className="order-items-container">
            <h1 className="heading-3">Order Items</h1>
            <div className="checkout-cart-head">
              <span>Product</span>
              <span>price</span>
              <span>Quantity</span>
              <span>total</span>
            </div>
            {orderItems?.map((item) => {
              return <OrderItem key={item._id} {...item} />;
            })}
          </div>
        </div>
        <div className="order-summary">
          <h1 className="heading-3">Order summary</h1>
          <div>
            <h4>Items</h4>
            <p>${itemsPrice}</p>
          </div>
          <div>
            <h4>shipping</h4>
            <p>${shippingPrice}</p>
          </div>
          <div>
            <h4>tax</h4>
            <p>${taxPrice}</p>
          </div>
          <div>
            <h4>total</h4>
            <p>${totalPrice}</p>
          </div>
          {isAdmin && !isDelivered && (
            <button className="button-1" onClick={deliverOrder}>mark as delivered</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;
