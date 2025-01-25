import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect } from "react";
import { getTrendingProducts } from "../slices/productSlice";

const TrendingProducts = () => {

  const {trendingProducts: products} = useSelector(state=>state.products.data)
  const dispatch = useDispatch()

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
            {products.map((product) => {
              return (
                <ProductCard key={product._id} slider={true} {...product} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
