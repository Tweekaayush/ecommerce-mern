import { useEffect, useState } from "react";
import { LuHeart, LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import {toast} from 'react-toastify'
import { addToWishlist, moveToCart, removeFromWishlist } from "../slices/userSlice";

const WishlistCard = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { product, name, image, price, rating,} = props
  const {cartItems} = useSelector((state)=>state.cart)

  const handleProductClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product}`);
  };

  const handleMoveToCart = (e) => {
    e.stopPropagation();
    const f = cartItems.find((item)=>item._id === product)
    if(!f){
      dispatch(moveToCart({product_id: product}))
    }else{
      toast.error('Item already in cart')
    }
  };

  const handleRemoveFromWishlist = (e) => {
    e.stopPropagation();
    dispatch(removeFromWishlist({_id: product}))
  };

  return (
    <div
      className="product-card"
      onClick={handleProductClick}
    >
      <div className="product-card-img">
        <img src={image} alt={name} />
      </div>
      <div className="product-card-content">
        <h5 className="ellipses">{name}</h5>
        <div className="product-card-rating">
          <Rating rating={rating} />
        </div>
        <h4>${price}</h4>
        <div className="wishlist-card-options">
            <button onClick={handleRemoveFromWishlist}>Remove</button>
            <button onClick={handleMoveToCart}>Move to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
