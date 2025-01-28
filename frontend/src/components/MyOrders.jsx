import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderListItem from "./OrderListItem";

const MyOrders = () => {
  const { myOrders } = useSelector((state) => state.orders.data);
  return (
    <div className="orders-history-container">
      <h1 className="heading-3">my orders</h1>
      <div className="profile-order-list">
        <div className="order-list-head">
          <span>ID</span>
          <span>date</span>
          <span>total</span>
          <span>paid</span>
          <span>delivered</span>
        </div>
        {myOrders?.map((order) => {
          return <OrderListItem key={order._id} {...order} admin={false}/>;
        })}
      </div>
    </div>
  );
};

export default MyOrders;
