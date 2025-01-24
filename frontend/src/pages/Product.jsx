import React, { useEffect, useState } from "react";
import TrendingProducts from "../components/TrendingProducts";
import { useLocation, useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const {pathname} = useLocation()

  const [product, setProduct] = useState({
    _id: "1",
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  });

  const increaseQuantity = () => {
    setQuantity(() =>
      quantity === product.countInStock ? quantity : quantity + 1
    );
  };
  const decreaseQuantity = () => {
    setQuantity(() => (quantity === 1 ? 1 : quantity - 1));
  };

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <section id="product-content">
        <div className="container">
          <div className="product-content-images">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-content-description">
            <h1 className="heading-2">{product.name}</h1>
            <div className="product-content-rating">
              <Rating rating={product.rating} />
              <h6>{product.numReviews} reviews</h6>
            </div>
            <div className="description">
              <h3 className="heading-3">description</h3>
              <p className="body-text-1">{product.description}</p>
            </div>
            <div className="quantity">
              <div className="quantity-container">
                <button onClick={decreaseQuantity} disabled={quantity === 1}>
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity === product.countInStock}
                >
                  +
                </button>
              </div>
              <p className="stock-message" data-stock={!product.countInStock}>
                {product.countInStock ? "In stock." : "Out of stock!"}
              </p>
            </div>
            <h2 className="product-content-price">${product.price}</h2>
            <div className="product-content-btns">
              <button className="button-1">Add to cart</button>
              <button className="button-2">Wishlist</button>
            </div>
          </div>
        </div>
      </section>
      <TrendingProducts />
    </>
  );
};

export default Product;
