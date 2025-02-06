import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import { updateUserProfile } from "../slices/userSlice";
import Skeleton from "./Skeleton";

const ShippingAddress = () => {
  const {
    loading,
    data: {
      user: { fullAddress, name },
    },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    dispatch(updateUserProfile({ fullAddress: data }));
  };

  useEffect(()=>{
    if(fullAddress?.address){
      setOpen(false)
    }else{
      setOpen(true)
    }
  }, [fullAddress?.address])

  return (
    <div className="shipping-address-container">
      <h1 className="heading-3">Shipping Address</h1>
      {fullAddress !== undefined && fullAddress?.address && (
        <div className="shipping-address">
          {!loading ? (
            <p className="body-text-1">
              {fullAddress?.address}, {fullAddress?.postalCode},
              <br />
              {fullAddress?.city}, {fullAddress?.country}
            </p>
          ) : (
            <Skeleton cls="address-skeleton" />
          )}
        </div>
      )}
      <div className="address-form-container">
        <button onClick={() => setOpen(!open)}>
          {fullAddress?.postalCode ? "Edit Address" : "Add Address +"}
        </button>
        <div className="accordian" style={{maxHeight: open?'300px':0, overflow: 'hidden', transition: 'max-height 0.3s ease-in-out'}}>
          <AddressForm submitFunction={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
