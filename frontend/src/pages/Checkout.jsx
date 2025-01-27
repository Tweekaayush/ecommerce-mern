import React, { useEffect, useState, useCallback } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import ShippingAddress from "../components/ShippingAddress";
import CheckoutCart from "../components/CheckoutCart";
import Payment from "../components/Payment";
import { saveShippingAddress } from "../slices/cartSlice";
import { createOrder } from "../slices/orderSlice";
import {useNavigate} from 'react-router-dom'

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
  const {error, data: {createdOrder}} = useSelector(state=>state.orders)
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const checkoutSteps = [
    {
      name: "Cart",
      component: <CheckoutCart />,
      func: function () {
      },
      button: "Continue",
    },
    {
      name: "Address",
      component: <ShippingAddress />,
      func: function () {
        dispatch(
          saveShippingAddress({
            address: "A-101, Milan Vihar 1, Abhay Khand 3, Indirapuram",
            city: "Ghaziabad",
            postalCode: "201014",
            country: "India",
          })
        );
      },
      button: "Continue",
    },
    {
      name: "Payment",
      component: <Payment />,
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
      },
      button: "place order",
    },
  ];

  const ActiveComponent = useCallback(() => {
    return checkoutSteps[step - 1]?.component;
  }, [step]);

  const handleNextStep = () => {
    if (step > checkoutSteps.length) return;
    checkoutSteps[step - 1].func();
    setStep((p) => p + 1);
  };

  useEffect(() => {
    if(createdOrder)navigate('/success')
    if(error)navigate('/failed')
  }, [createdOrder, error]);

  return (
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
            <button className="button-1" onClick={handleNextStep}>
              {checkoutSteps[step - 1]?.button}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
