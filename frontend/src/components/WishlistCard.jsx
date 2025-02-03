import { useEffect, useState } from "react";
import { LuHeart, LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import {toast} from 'react-toastify'
import { addToWishlist, removeFromWishlist } from "../slices/userSlice";

const WishlistCard = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { product, name, image, price, rating,} = props

  const handleProductClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product}`);
  };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     dispatch(
//           addToCart({
//             ...productDetails,
//             quantity: 1,
//           })
//         )
//     toast.success('Added to cart')
//   };

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
            <button >Move to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
