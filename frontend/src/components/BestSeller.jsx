import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

const BestSeller = () => {
  const {
    loading,
    data: { bestSellingProducts: products },
  } = useSelector((state) => state.products);

  return (
    <section id="bestseller">
      <div className="container">
        <h1 className="heading-2">Bestseller</h1>
        <div className="bestseller-container">
          {!loading
            ? products.map((product) => {
                return <ProductCard key={product._id} {...product} />;
              })
            : new Array(6).fill(0).map((_, i) => {
                return <Skeleton cls="product-card-skeleton" />;
              })}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
