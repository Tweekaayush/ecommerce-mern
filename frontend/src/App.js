import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { ToastContainer, Bounce, toast } from "react-toastify";
import UsersList from "./pages/UsersList";
import {
  clearProductErrors,
  clearProductSuccessMessage,
} from "./slices/productSlice";
import { clearOrderErrors } from "./slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUsersErrors,
  clearUserSuccessMessage,
  loadUser,
} from "./slices/userSlice";
import Cart from "./components/Cart";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Loader from "./components/Loader";
const CreateProduct = lazy(()=>import("./pages/CreateProduct"));
const ForgotPassword = lazy(()=>import("./pages/ForgotPassword"));
const ResetPassword = lazy(()=>import("./pages/ResetPassword"))
const Wishlist = lazy(()=>import("./pages/Wishlist"));
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Browse = lazy(() => import("./pages/Browse"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Profile = lazy(() => import("./pages/Profile"));
const Success = lazy(() => import("./pages/Success"));
const Failed = lazy(() => import("./pages/Failed"));
const Order = lazy(() => import("./pages/Order"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProductsList = lazy(() => import("./pages/ProductsList"));
const OrdersList = lazy(() => import("./pages/OrdersList"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const UserInfo = lazy(() => import("./pages/UserInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const [cartStatus, setCartStatus] = useState(false);
  const { error: userError, successMessage: userSuccessMessage } = useSelector(
    (state) => state.user
  );
  const { error: productError, successMessage: productSuccessMessage } =
    useSelector((state) => state.products);
  const { error: orderError, successMessage: orderSuccessMessage } =
    useSelector((state) => state.orders);

  useEffect(() => {
    cartStatus
      ? document.body.classList.add("hidden")
      : document.body.classList.remove("hidden");
  }, [cartStatus]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch(clearUsersErrors());
    }
    if (productError) {
      toast.error(productError);
      dispatch(clearProductErrors());
    }
    if (orderError) {
      toast.error(orderError);
      dispatch(clearOrderErrors());
    }
  }, [userError, productError, orderError]);

  useEffect(() => {
    if (userSuccessMessage) {
      toast.success(userSuccessMessage);
      dispatch(clearUserSuccessMessage());
    }
    if (productSuccessMessage) {
      toast.success(productSuccessMessage);
      dispatch(clearProductSuccessMessage());
    }
  }, [userSuccessMessage, productSuccessMessage]);

  return (
    <Router>
      <div
        className="pg-overlay"
        style={{ display: cartStatus ? "block" : "none" }}
      ></div>
      <Navbar setCartStatus={setCartStatus} />
      <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password/forget" element={<ForgotPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/success/:id" element={<Success />} />
            <Route path="/failed" element={<Failed />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products/list" element={<ProductsList />} />
            <Route path="/product/:id/edit" element={<EditProduct />} />
            <Route path="/user/:id" element={<UserInfo />} />
            <Route path="/orders/list" element={<OrdersList />} />
            <Route path="/users/list" element={<UsersList />} />
            <Route path="/product/create" element={<CreateProduct />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Router>
  );
};

export default App;
