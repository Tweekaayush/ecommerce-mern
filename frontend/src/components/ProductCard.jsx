import { useEffect, useState } from "react";
import { LuHeart, LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import {toast} from 'react-toastify'
import { addToWishlist } from "../slices/userSlice";

const ProductCard = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);
  const {slider, ...productDetails} = props
  const { _id, name, image, price, rating,} = productDetails
  const handleProductClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${_id}`);
  };
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
          addToCart({
            ...productDetails,
            quantity: 1,
          })
        )
    toast.success('Added to cart')
  };
  const handleAddToWishlist = (e) => {
    e.stopPropagation();

    dispatch(addToWishlist(productDetails))
  };

  const handleResize = () => {
    if (!slider) return;
    const container = document.getElementById("slider").offsetWidth;
    const slide = document.getElementById("slider");
    if (container > 992) {
      setWidth((container - 56) / 4);
      slide.scrollLeft = 0;
    } else if (container > 768) {
      setWidth((container - 40) / 3);
      slide.scrollLeft = 0;
    } else if (container > 480) {
      setWidth((container - 24) / 2);
      slide.scrollLeft = 0;
    } else {
      setWidth(container - 8);
      slide.scrollLeft = 0;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="product-card"
      onClick={handleProductClick}
      style={slider ? { width: width } : {}}
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
        <div className="product-card-options">
          <LuHeart onClick={handleAddToWishlist} />
          <LuShoppingCart onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
