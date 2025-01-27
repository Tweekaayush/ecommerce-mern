import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderItem = ({
  _id,
  isDelivered,
  totalPrice,
  createdAt,
  isPaid,
  paidAt,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="order-item-container"
      onClick={() => navigate(`/orders/${_id}`)}
    >
      <p className="ellipses">{_id}</p>
      <p className="ellipses">{createdAt.substring(0, 10)}</p>
      <p className="ellipses">${totalPrice}</p>
      <p className="ellipses">{isPaid ? paidAt.substring(0, 10) : "not paid"}</p>
      <p className="ellipses">{isDelivered ? "delivered" : "not delivered"}</p>
    </div>
  );
};

const MyOrders = () => {
  const { myOrders } = useSelector((state) => state.orders.data);
  console.log(myOrders);
  return (
    <div className="orders-history-container">
      <h1 className="heading-3">my orders</h1>
      <div className="profile-order-list">
        <div className="profile-order-head">
          <span>ID</span>
          <span>date</span>
          <span>total</span>
          <span>paid</span>
          <span>delivered</span>
        </div>
        {myOrders?.map((order) => {
          return <OrderItem key={order._id} {...order} />;
        })}
      </div>
    </div>
  );
};

export default MyOrders;
