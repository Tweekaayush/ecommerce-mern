import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import { updateUserProfile } from "../slices/userSlice";

const ShippingAddress = () => {
  const {
    user: { fullAddress, name },
  } = useSelector((state) => state.user.data);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    dispatch(updateUserProfile({ fullAddress: data }));
  };

  return (
    <div className="shipping-address-container">
      <h1 className="heading-3">Shipping Address</h1>
      {fullAddress!==undefined && fullAddress?.address && (
        <div className="shipping-address">
          <h4>{name}</h4>
          <p className="body-text-1">
            {fullAddress?.address}, {fullAddress?.postalCode},
            <br />
            {fullAddress?.city}, {fullAddress?.country}
          </p>
        </div>
      )}
      <div className="address-form-container">
        <button onClick={() => setOpen(!open)}>
          {fullAddress?.postalCode ? "Edit Address" : "Add Address +"}
        </button>
        <AddressForm submitFunction={handleSubmit} />
      </div>
    </div>
  );
};

export default ShippingAddress;
