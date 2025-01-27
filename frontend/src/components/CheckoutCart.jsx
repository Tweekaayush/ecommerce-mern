import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutCartItem = (props) => {
  const { _id, name, brand, image, quantity, price, update } = props;
  const [qty, setQty] = useState(quantity);

  return (
    <div className="checkout-cart-item">
      <div className="checkout-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="checkout-item-info">
        <h4 className="ellipses-2">{name}</h4>
        <h6>Brand: {brand}</h6>
      </div>

      <p>${price}</p>
      <div className="checkout-item-quantity">
        <div className="">
          {update && <button>-</button>}
          <span>{qty}</span>
          {update && <button>+</button>}
        </div>
      </div>
      <p>${price * quantity}</p>
    </div>
  );
};

const CheckoutCart = ({ update = true }) => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="checkout-cart-container">
      <h1 className="heading-3">Cart Items</h1>
      <div className="checkout-cart-head">
        <span>Product</span>
        <span>price</span>
        <span>Quantity</span>
        <span>total</span>
      </div>
      <ul className="checkout-cart-items">
        {cartItems.map((item) => {
          return <CheckoutCartItem key={item._id} {...item} update={update} />;
        })}
      </ul>
    </div>
  );
};

export default CheckoutCart;
