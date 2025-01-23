import React from "react";
import products from "../products";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  return (
    <section id="bestseller">
      <div className="container">
        <h1 className="heading-2">Bestseller</h1>
        <div className="bestseller-container">
          {products.map((product) => {
            return <ProductCard key={product._id} {...product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
