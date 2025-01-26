import React from "react";
import img1 from '../assets/category/img1.jpg'
import img2 from '../assets/category/img2.jpg'
import img3 from '../assets/category/img3.jpg'
import img4 from '../assets/category/img4.jpg'

const TrendingCategories = () => {
  return (
    <section id="trending-category">
      <div className="container">
      <div className="category">
          <div className="category-overlay"></div>
          <h2>electronics</h2>
          <img src={img4} alt="" />
        </div>
        <div className="category">
          <div className="category-overlay"></div>
          <h2>Furniture</h2>
          <img src={img1} alt="" />
        </div>
        <div className="category">
          <div className="category-overlay"></div>
          <h2>skin-care</h2>
          <img src={img2} alt="" />
        </div>
        <div className="category">
          <div className="category-overlay"></div>
          <h2>kitchen</h2>
          <img src={img3} alt="" />
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories;
