import React from "react";
import { useSelector } from "react-redux";
import CheckoutCart from "./CheckoutCart";

const Payment = () => {
  const { name } = useSelector((state) => state.user.data);
  const { shippingAddress } = useSelector((state) => state.cart);
  return (
    <div className="payment-container">
      <h1 className="heading-3">Shipping Address</h1>
      <div className="shipping-address">
        <h4>{name}</h4>
        <p className="body-text-1">
          {shippingAddress.address}, {shippingAddress.postalCode},
          <br />
          {shippingAddress.city}, {shippingAddress.country}
        </p>
      </div>
      <CheckoutCart update={false}/>
    </div>
  );
};

export default Payment;
