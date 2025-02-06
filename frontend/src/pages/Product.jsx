import React, { useEffect, useState } from "react";
import TrendingProducts from "../components/TrendingProducts";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductErrors,
  getProductById,
  getTrendingProducts,
} from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import Reviews from "../components/Reviews";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addToWishlist } from "../slices/userSlice";
import Skeleton from "../components/Skeleton";

const Product = () => {
  const {
    loading,
    data: {
      productDetails: {
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock,
        rating,
        numReviews,
      },
      productDetails,
    },
    error,
  } = useSelector((state) => state.products);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    setQuantity(() => (quantity === countInStock ? quantity : quantity + 1));
  };
  const decreaseQuantity = () => {
    setQuantity(() => (quantity === 1 ? 1 : quantity - 1));
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...productDetails,
        quantity: quantity,
      })
    );
    toast.success("Added to cart");
  };

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getTrendingProducts());
  }, [id]);

  useEffect(() => {
    if (error === "Product not found") {
      navigate("/product-not-found");
    }
  }, [error]);

  useEffect(() => {
    document.title = name || "Loading";
  }, [name]);

  return (
    <>
      <section id="product-content">
        <div className="container">
          <div className="product-content-images">
            {!loading ? (
              <img src={image} alt={name} />
            ) : (
              <Skeleton cls="product-image-skeleton" />
            )}
          </div>
          <div className="product-content-description">
            {!loading ? (
              <>
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
                  {countInStock > 0 && (
                    <div className="quantity-container">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                      >
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
                  )}
                  <p className="stock-message" data-stock={!countInStock}>
                    {countInStock ? "In stock." : "Out of stock!"}
                  </p>
                </div>
                <h2 className="product-content-price">${price}</h2>
                <div className="product-content-btns">
                  {countInStock > 0 && (
                    <button className="button-1" onClick={handleAddToCart}>
                      Add to cart
                    </button>
                  )}
                  <button
                    className="button-2"
                    onClick={() => dispatch(addToWishlist(productDetails))}
                    disabled={loading}
                  >
                    Wishlist
                  </button>
                </div>
              </>
            ) : (
              <>
                <Skeleton cls="title-skeleton" />
                <Skeleton cls="product-rating-skeleton" />
                <Skeleton cls="description-skeleton" />
                <Skeleton cls="product-quantity-skeleton" />
                <div className="product-content-btns">
                  <Skeleton cls="button-skeleton" />
                  <Skeleton cls="button-skeleton" />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <TrendingProducts />
      <section id="reviews">
        <div className="container">
          <h1 className="heading-2">Customer Reviews</h1>
          <div className="product-reviews">
            <div className="overall-rating">
              {!loading ? (
                <>
                  <Rating rating={rating} />
                  <h4>{rating} out of 5</h4>
                  <p>{numReviews} global rating(s)</p>
                </>
              ) : (
                <>
                  <Skeleton cls="rating-skeleton" />
                  <Skeleton cls="product-rating-skeleton" />
                </>
              )}
            </div>
            <Reviews />
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
