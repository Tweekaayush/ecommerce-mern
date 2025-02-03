import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderListItem from "./OrderListItem";
import Pagination from "./Pagination";
import { getMyOrders } from "../slices/orderSlice";
import Loader from "./Loader";

const MyOrders = () => {
  const {
    loading,
    data: { myOrders, totalPages },
  } = useSelector((state) => state.orders);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders(page));
  }, [page]);
  return (
    <div className="orders-history-container">
      <h1 className="heading-3">my orders</h1>
      {!loading ? (
        <>
          <div className="profile-order-list">
            <div className="order-list-head">
              <span>ID</span>
              <span>date</span>
              <span>total</span>
              <span>paid</span>
              <span>delivered</span>
            </div>
            {myOrders?.map((order) => {
              return <OrderListItem key={order._id} {...order} admin={false} />;
            })}
          </div>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
