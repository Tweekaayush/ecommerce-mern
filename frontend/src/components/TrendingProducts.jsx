import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect } from "react";
import { getTrendingProducts } from "../slices/productSlice";
import Skeleton from "./Skeleton";

const TrendingProducts = () => {
  const {
    loading,
    data: { trendingProducts: products },
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - slider.offsetWidth - 16;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + slider.offsetWidth + 16;
  };

  return (
    <section id="trending-products">
      <div className="container">
        <div className="slider-header">
          <h1 className="heading-2">Trending</h1>
          <div className="slider-buttons">
            <button onClick={slideLeft}>
              <FaAngleLeft />
            </button>
            <button onClick={slideRight}>
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="trending-products-container" id="slider">
          <div className="slider">
            {!loading
              ? products.map((product) => {
                  return (
                    <ProductCard key={product._id} slider={true} {...product} />
                  );
                })
              : new Array(4).fill(0).map((_, i) => {
                  return <Skeleton cls="product-card-skeleton-2" />;
                })
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
