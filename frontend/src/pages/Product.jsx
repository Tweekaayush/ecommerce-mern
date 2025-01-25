import React, { useEffect, useState } from "react";
import TrendingProducts from "../components/TrendingProducts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, getProductById, getProducts, getTrendingProducts } from "../slices/productSlice";


const Product = () => {

  const {loading , data: {productDetails: {name, image, description, brand, category, price, countInStock, rating, numReviews}}, error} = useSelector((state)=>state.products)
  const { id } = useParams();
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const {pathname} = useLocation()
  const dispatch = useDispatch()

  const increaseQuantity = () => {
    setQuantity(() =>
      quantity === countInStock ? quantity : quantity + 1
    );
  };
  const decreaseQuantity = () => {
    setQuantity(() => (quantity === 1 ? 1 : quantity - 1));
  };

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(()=>{
    dispatch(getProductById(id))
    dispatch(getTrendingProducts())
  }, [id])

  useEffect(()=>{
    if(error === 'Request failed with status code 404'){
      dispatch(clearErrors())
      navigate('/')
    }
  }, [error])

  return (
    !loading?
    <>
      <section id="product-content">
        <div className="container">
          <div className="product-content-images">
            <img src={image} alt={name} />
          </div>
          <div className="product-content-description">
            <h1 className="heading-2">{name}</h1>
            <div className="product-content-rating">
              <Rating rating={rating} />
              <h6>{numReviews} reviews</h6>
            </div>
            <div className="description">
              <h3 className="heading-3">description</h3>
              <p className="body-text-1">{description}</p>
            </div>
            <div className="quantity">
              <div className="quantity-container">
                <button onClick={decreaseQuantity} disabled={quantity === 1}>
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity === countInStock}
                >
                  +
                </button>
              </div>
              <p className="stock-message" data-stock={!countInStock}>
                {countInStock ? "In stock." : "Out of stock!"}
              </p>
            </div>
            <h2 className="product-content-price">${price}</h2>
            <div className="product-content-btns">
              <button className="button-1">Add to cart</button>
              <button className="button-2">Wishlist</button>
            </div>
          </div>
        </div>
      </section>
      <TrendingProducts />
    </>:<></>
  )
};

export default Product;
