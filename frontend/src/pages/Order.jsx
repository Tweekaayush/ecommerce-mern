import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById, updateOrderToDelivered } from "../slices/orderSlice";
import Loader from "../components/Loader";
import { ImSpinner2 } from "react-icons/im";
import Skeleton from "../components/Skeleton";

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
    loading: orderLoading,
    data: {
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
        deliveredAt,
      },
    },
  } = useSelector((state) => state.orders);

  const {
    loading: userLoading,
    data: {
      user: { isAdmin },
    },
  } = useSelector((state) => state.user);

  const deliverOrder = () => {
    dispatch(updateOrderToDelivered(id));
  };

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id]);

  useEffect(() => {
    document.title = "Order Details";
  }, []);

  return (
    <section id="order">
      <div className="container">
        <div className="order-container">
          <div className="shipping-address">
            <h1 className="heading-3">Shipping Address</h1>
            {!orderLoading ? (
              <>
                <p className="body-text-1">
                  {shippingAddress?.address}, {shippingAddress?.postalCode},
                  <br />
                  {shippingAddress?.city}, {shippingAddress?.country}
                </p>
                <p className={`status ${isDelivered ? "true" : false}`}>
                  {isDelivered
                    ? `Delivered on ${deliveredAt}`
                    : "Not Delivered"}
                </p>
              </>
            ) : (
              <Skeleton cls="address-skeleton" />
            )}
          </div>
          <div className="order-payment">
            <h1 className="heading-3">Payment Method</h1>
            {!orderLoading ? (
              <>
                <h4>Method: {paymentMethod}</h4>
                <p className={`status ${isPaid ? "true" : false}`}>
                  {isPaid ? `Paid on ${paidAt}` : "Not Paid"}
                </p>
              </>
            ) : (
              <Skeleton cls="address-skeleton" />
            )}
          </div>

          <div className="order-items-container">
            <h1 className="heading-3">Order Items</h1>
            <div className="checkout-cart-head">
              <span>Product</span>
              <span>price</span>
              <span>Quantity</span>
              <span>total</span>
            </div>
            {!orderLoading
              ? orderItems?.map((item) => {
                  return <OrderItem key={item._id} {...item} />;
                })
              : new Array(3).fill(0).map((_, i) => {
                  return <Skeleton cls="list-item-skeleton" />;
                })}
          </div>
        </div>
        <div className="order-summary">
          <h1 className="heading-3">Order summary</h1>
          <div>
            <h4>Items</h4>
            {!orderLoading? <p>${itemsPrice}</p>:<Skeleton cls="price-skeleton"/>}
          </div>
          <div>
            <h4>shipping</h4>
            {!orderLoading? <p>${shippingPrice}</p>:<Skeleton cls="price-skeleton"/>}
          </div>
          <div>
            <h4>tax</h4>
            {!orderLoading? <p>${taxPrice}</p>:<Skeleton cls="price-skeleton"/>}
          </div>
          <div>
            <h4>total</h4>
            {!orderLoading ? <p>${totalPrice}</p>:<Skeleton cls="price-skeleton"/>}
          </div>
          {isAdmin && !isDelivered && (
            <button
              className="button-1"
              onClick={deliverOrder}
              disabled={orderLoading}
            >
              {orderLoading ? (
                <ImSpinner2 className="fa-spin" />
              ) : (
                "mark as delivered"
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;
