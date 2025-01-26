import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../slices/cartSlice";

const CartItem = (props) => {
    const {_id, name, image, quantity, price, countInStock} = props
    const [qty, setQty] = useState(quantity)
    const dispatch = useDispatch()

    const decreaseQty = () =>{
        setQty(prev=>prev-1)
    }

    const increaseQty = () =>{
        setQty(prev=>prev+1)
    }

    useEffect(()=>{
        dispatch(updateQuantity({...props, quantity: qty}))
    }, [qty])

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={image} alt={name} />
      </div>
      <div className="cart-item-info">
        <h6 className="ellipses-2">{name}</h6>
        <div className="cart-quantity-container">
          <button onClick={decreaseQty}>-</button>
          <span>{qty}</span>
          <button onClick={increaseQty} disabled={qty === countInStock}>+</button>
        </div>
        <p>${price}</p>
      </div>
      <div className="remove-btn">
        <IoClose onClick={()=>dispatch(removeFromCart(_id))}/>
      </div>
    </div>
  );
};

const Cart = ({ cartStatus, setCartStatus }) => {
  const ref = useRef(0);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setCartStatus(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside, true);
    return () => window.removeEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <div
      ref={ref}
      className={`cart-container ${cartStatus ? "cart-active" : ""}`}
    >
      <div className="cart-header">
        <h1>Cart</h1>
        <IoClose onClick={() => setCartStatus(false)} />
      </div>
      <div className="cart-content">
        <div className="cart-items">{cartItems.map((item) => {
            return <CartItem key={item._id} {...item}/>
        })}</div>
        <div className="cart-summary">
          <h1>Subtotal:</h1>
          <p>${totalPrice}</p>
          <button className="button-1">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
