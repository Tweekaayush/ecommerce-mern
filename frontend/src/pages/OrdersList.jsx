import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderListItem from "../components/OrderListItem";
import { getAllOrders } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";

const OrdersList = () => {
  const { allOrders } = useSelector((state) => state.orders.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  return (
    <section id="order-list">
      <div className="container">
        <h5 className="dashboard-link" onClick={() => navigate("/dashboard")}>
          dashboard/
        </h5>
        <h1 className="heading-3">Orders List</h1>
        <div>
          <div className="order-list-head">
            <span>ID</span>
            <span>User</span>
            <span>date</span>
            <span>total</span>
            <span>paid</span>
            <span>delivered</span>
          </div>
          {allOrders?.map((order) => {
            return <OrderListItem key={order._id} {...order} admin={true} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default OrdersList;
