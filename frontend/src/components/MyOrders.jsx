import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderListItem from "./OrderListItem";
import Pagination from "./Pagination";
import { getMyOrders } from "../slices/orderSlice";

const MyOrders = () => {
  const { myOrders, totalPages } = useSelector((state) => state.orders.data);
  const [page, setPage] = useState(1)
const dispatch = useDispatch()
useEffect(() => {
  dispatch(getMyOrders(page));
}, [page]);
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
      <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
    </div>
  );
};

export default MyOrders;
