import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderListItem from "../components/OrderListItem";
import { getAllOrders } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const OrdersList = () => {
  const {
    loading,
    data: { allOrders, totalPages },
  } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrders(page));
  }, [page]);

  return !loading ? (
    <section id="order-list">
      <div className="container">
        <h5 className="dashboard-link" onClick={() => navigate("/dashboard")}>
          dashboard /
        </h5>
        <h1 className="heading-3">Orders List</h1>
        <div className="order-list-container">
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
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export default OrdersList;
