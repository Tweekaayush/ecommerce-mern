import React from "react";
import img1 from '../assets/promotion/promotion1.png'
import { useNavigate } from "react-router-dom";

const PromotionBanner = () => {
  const navigate = useNavigate()
  return (
    <section id="promotion-banner">
      <div className="container">
        <div className="promotion-banner-image">
          <img src={img1} alt="promotion" />
        </div>
        <div className="promotion-banner-content">
          <h4 className="heading-3">heading</h4>
          <h1 className="heading-1">Heading</h1>
          <p className="body-text-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            dignissimos autem error ipsa dolorem. Ducimus nobis debitis cum
            provident culpa.
          </p>
          <button className="button-1" onClick={()=>navigate('/browse?page=1&category=furniture')}>shop now</button>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
