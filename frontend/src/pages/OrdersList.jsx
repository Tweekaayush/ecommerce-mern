import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderListItem from "../components/OrderListItem";
import { getAllOrders } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import Skeleton from "../components/Skeleton";

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

  useEffect(() => {
    document.title = "Orders List";
  }, []);

  return (
    <section id="order-list">
      <div className="container">
        <h5 className="dashboard-link" onClick={() => navigate("/dashboard")}>
          dashboard /
        </h5>
        <h1 className="heading-5">Orders List</h1>
        <div className="order-list-container">
          <div className="order-list-head">
            <span>ID</span>
            <span>User</span>
            <span>date</span>
            <span>total</span>
            <span>paid</span>
            <span>delivered</span>
          </div>
          {!loading
            ? allOrders?.map((order) => {
                return (
                  <OrderListItem key={order._id} {...order} admin={true} />
                );
              })
            : new Array(5).fill(0).map((_, i) => {
                return <Skeleton cls="list-item-skeleton" />;
              })}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default OrdersList;
