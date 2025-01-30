import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUsersErrors, clearUserSuccessMessage, loadUser } from "./slices/userSlice";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import Order from "./pages/Order";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import OrdersList from "./pages/OrdersList";
import EditProduct from "./pages/EditProduct";
import { ToastContainer, Bounce, toast } from "react-toastify";
import UsersList from "./pages/UsersList";
import { clearProductErrors, clearProductSuccessMessage } from "./slices/productSlice";
import { clearOrderErrors } from "./slices/orderSlice";
import UserInfo from "./pages/UserInfo";

const App = () => {
  const dispatch = useDispatch();
  const [cartStatus, setCartStatus] = useState(false);
  const {error: userError, successMessage: userSuccessMessage} = useSelector(state=>state.user)
  const {error: productError, successMessage: productSuccessMessage} = useSelector(state=>state.products)
  const {error: orderError, successMessage: orderSuccessMessage} = useSelector(state=>state.orders)

  useEffect(() => {
    cartStatus
      ? document.body.classList.add("hidden")
      : document.body.classList.remove("hidden");
  }, [cartStatus]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  
  useEffect(()=>{
    if(userError){
      toast.error(userError)
      dispatch(clearUsersErrors())
    }
    if(productError){
      toast.error(productError)
      dispatch(clearProductErrors())
    }
    if(orderError){
      toast.error(orderError)
      dispatch(clearOrderErrors())
    }
  }, [userError, productError, orderError])


  useEffect(()=>{
    if(userSuccessMessage){
      toast.success(userSuccessMessage)
      dispatch(clearUserSuccessMessage())
    }
    if(productSuccessMessage){
      toast.success(productSuccessMessage)
      dispatch(clearProductSuccessMessage())
    }

  }, [userSuccessMessage, productSuccessMessage])

  return (
    <Router>
      <div
        className="pg-overlay"
        style={{ display: cartStatus ? "block" : "none" }}
      ></div>
      <Navbar setCartStatus={setCartStatus} />
      <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/order/:id" element={<Order />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products/list" element={<ProductsList />} />
          <Route path="/product/:id/edit" element={<EditProduct />} />
          <Route path="/user/:id" element={<UserInfo />} />
          <Route path="/orders/list" element={<OrdersList />} />
          <Route path="/users/list" element={<UsersList />} />
        </Route>
      </Routes>
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
