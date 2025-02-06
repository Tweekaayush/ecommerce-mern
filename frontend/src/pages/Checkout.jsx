import React, { useEffect, useState, useCallback } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import ShippingAddress from "../components/ShippingAddress";
import CheckoutCart from "../components/CheckoutCart";
import Payment from "../components/Payment";
import { saveShippingAddress } from "../slices/cartSlice";
import { createOrder } from "../slices/orderSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaShoppingCart, FaAddressBook, FaRegCreditCard } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import img from '../assets/cart/empty-cart.png'

const Checkout = () => {
  const {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    cartItems,
    paymentMethod,
    shippingAddress,
  } = useSelector((state) => state.cart);
  const {
    loading: userLoading,
    data: {
      user: { fullAddress },
    },
  } = useSelector((state) => state.user);
  const { loading: orderLoading } = useSelector((state) => state.orders);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const checkoutSteps = [
    {
      name: "Cart",
      component: <CheckoutCart />,
      func: function () {
        return true;
      },
      button: "Continue",
      icon: <FaShoppingCart />,
    },
    {
      name: "Shipping Address",
      component: <ShippingAddress />,
      func: function () {
        if (fullAddress) {
          dispatch(saveShippingAddress({ ...fullAddress }));
          return true;
        }
        toast.error("Please enter your shipping address");
        return false;
      },
      button: "Continue",
      icon: <FaAddressBook />,
    },
    {
      name: "Payment",
      component: <Payment setStep={setStep} />,
      func: function () {
        const order = {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        };
        dispatch(createOrder(order));
        return false;
      },
      button: "place order",
      icon: <FaRegCreditCard />,
    },
  ];

  const ActiveComponent = useCallback(() => {
    return checkoutSteps[step - 1]?.component;
  }, [step]);

  const handleNextStep = () => {
    if (step > checkoutSteps.length) return;
    const res = checkoutSteps[step - 1].func();
    if (res) setStep((p) => p + 1);
  };

  useEffect(() => {
    document.title = checkoutSteps[step - 1].name;
  }, [step]);

  return cartItems.length !== 0 ? (
    <>
      <CheckoutSteps
        stepNo={step}
        checkoutSteps={checkoutSteps}
        setStep={setStep}
      />
      <section id="checkout">
        <div className="container">
          <ActiveComponent />
          <div className="checkout-summary">
            <h1 className="heading-3">cart summary</h1>
            <div>
              <h4 className="heading-4">Items Price</h4>
              <p>${itemsPrice}</p>
            </div>
            <div>
              <h4 className="heading-4">Shipping price</h4>
              <p>${shippingPrice}</p>
            </div>
            <div>
              <h4 className="heading-4">Tax Price</h4>
              <p>${taxPrice}</p>
            </div>
            <div>
              <h4 className="heading-4">total price</h4>
              <p>${totalPrice}</p>
            </div>
            <button
              className="button-1"
              onClick={handleNextStep}
              disabled={orderLoading || userLoading}
            >
              {orderLoading || userLoading ? (
                <ImSpinner2 />
              ) : (
                checkoutSteps[step - 1]?.button
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  ) : (
    <section id="empty-cart">
      <div className="container">
        <img src={img} alt="empty-cart" />
      </div>
    </section>
  );
};

export default Checkout;
