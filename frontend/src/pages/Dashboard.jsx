import React, { useEffect } from "react";
import {
  LuShoppingCart,
  LuUserRound,
  LuDollarSign,
  LuPackageOpen,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsCount } from "../slices/productSlice";
import { getUserCount } from "../slices/userSlice";
import { getOrdersInfo } from "../slices/orderSlice";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";
import Loader from "../components/Loader";
import Skeleton from "../components/Skeleton";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: productLoading,
    data: { productCount },
  } = useSelector((state) => state.products);
  const {
    loading: userLoading,
    data: { userCount },
  } = useSelector((state) => state.user);
  const {
    loading: orderLoading,
    data: { ordersInfo },
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrdersInfo());
    dispatch(getUserCount());
    dispatch(getProductsCount());
    document.title = "Dashboard";
  }, []);

  return (
    <section id="dashboard">
      <div className="container">
        <h1 className="heading-5">Dashboard</h1>
        <div className="dashboard-content">
          {!productLoading && !userLoading && !orderLoading ? (
            <>
              <div className="dashboard-card">
                <div className="dashboard-card-head">
                  <h1 className="heading-4">Total Revenue</h1>
                  <p>${ordersInfo?.totalRevenue.toFixed(2)}</p>
                </div>
                <div>
                  <span>
                    <LuDollarSign />
                  </span>
                </div>
              </div>
              <div
                className="dashboard-card"
                onClick={() => navigate("/orders/list")}
              >
                <div className="dashboard-card-head">
                  <h1 className="heading-4">Orders</h1>
                  <p>{ordersInfo?.orderCount}</p>
                </div>
                <div>
                  <span>
                    <LuShoppingCart />
                  </span>
                </div>
              </div>
              <div
                className="dashboard-card"
                onClick={() => navigate("/users/list")}
              >
                <div className="dashboard-card-head">
                  <h1 className="heading-4">Users</h1>
                  <p>{userCount}</p>
                </div>
                <div>
                  <span>
                    <LuUserRound />
                  </span>
                </div>
              </div>
              <div
                className="dashboard-card"
                onClick={() => navigate("/products/list")}
              >
                <div className="dashboard-card-head">
                  <h1 className="heading-4">Products</h1>
                  <p>{productCount}</p>
                </div>
                <div>
                  <span>
                    <LuPackageOpen />
                  </span>
                </div>
              </div>
              <div className="revenue-chart">
                <h1 className="heading-3" style={{ marginBottom: 0 }}>
                  Revenue
                </h1>
                <p className="body-text-1">
                  (last {ordersInfo?.monthlyRevenue.length} days)
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={ordersInfo?.monthlyRevenue}
                    style={{ fontSize: "14px" }}
                  >
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="revenue-paid">
                <h1 className="heading-3" style={{ marginBottom: "16px" }}>
                  Orders Status
                </h1>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ordersInfo?.deliveryStatus}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <>
              <Skeleton cls='dashboard-card-skeleton'/>
              <Skeleton cls='dashboard-card-skeleton'/>
              <Skeleton cls='dashboard-card-skeleton'/>
              <Skeleton cls='dashboard-card-skeleton'/>
              <Skeleton cls='dashboard-bar-chart-skeleton'/>
              <Skeleton cls='dashboard-pie-chart-skeleton'/>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
