import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShippingAddress = () => {
  const { fullAddress, name } = useSelector((state) => state.user.data);
 const [formData, setFormData] = useState({
    address: 'A-101, Milan Vihar 1, Abhay Khand 3, Indirapuram',
    city: 'Ghaziabad',
    postalCode: '201014',
    country: 'India'
 })

 const dispatch = useDispatch()
  const [open, setOpen] = useState(false)


  const handleSubmit = (e) =>{
    e.preventDefault()

  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]:value})
  };
  return (
    <div className="shipping-address-container">
      <h1 className="heading-3">Shipping Address</h1>
      <div className="shipping-address">
        <h4>{name}</h4>
        <p className="body-text-1">
            {formData.address}, {formData.postalCode},
            <br/>
            {formData.city}, {formData.country}
        </p>
        </div>
      <div className="address-form">
        <button onClick={()=>setOpen(!open)}>
          {fullAddress?.postalCode ? "Edit Address" : "Add Address +"}
        </button>
        <form className={open?'address-form-active':''} onClick={handleSubmit}>
          <label className="form-label">
            <input
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={formData.address}
            />
            <span>address</span>
          </label>
          <label className="form-label">
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={handleChange}
              value={formData.postalCode}
            />
            <span>postal code</span>
          </label>
          <label className="form-label">
            <input
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={formData.city}
            />
            <span>city</span>
          </label>
          <label className="form-label">
            <input
              type="text"
              name="country"
              id="country"
              onChange={handleChange}
              value={formData.country}
            />
            <span>country</span>
          </label>
          <input type="submit" value="Update" className="button-2"/>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
