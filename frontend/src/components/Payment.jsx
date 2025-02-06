import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CheckoutCart from "./CheckoutCart";

const Payment = ({setStep}) => {
  const { user: {name} } = useSelector((state) => state.user.data);
  const { shippingAddress } = useSelector((state) => state.cart);
  useEffect(()=>{
    if(Object.keys(shippingAddress).length === 0){
      setStep(2)
    }
  },[])
  return (
    <div className="payment-container">
      <h1 className="heading-3">Shipping Address</h1>
      <div className="shipping-address">
        <p className="body-text-1">
          {shippingAddress?.address}, {shippingAddress?.postalCode},
          <br />
          {shippingAddress?.city}, {shippingAddress?.country}
        </p>
      </div>
      <CheckoutCart update={false}/>
    </div>
  );
};

export default Payment;
