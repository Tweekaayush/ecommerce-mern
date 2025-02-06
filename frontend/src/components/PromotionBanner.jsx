import React from "react";
import img1 from '../assets/promotion/promotion1.jpg'
import { useNavigate } from "react-router-dom";

const PromotionBanner = () => {
  const navigate = useNavigate()
  return (
    <section id="promotion-banner" style={{backgroundImage: `url(${img1})`}}>
      <div className="container">
        <div className="promotion-banner-image">
        </div>
        <div className="promotion-banner-content">
          <h4 className="heading-3">Minimalist Decor</h4>
          <h1 className="heading-1">that suits every style</h1>
          <p className="body-text-1">
            A variety of minimalist-style furniture products with modern and contemporary designs.
          </p>
          <button className="button-1" onClick={()=>navigate('/browse?page=1&category=furniture')}>shop now</button>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
