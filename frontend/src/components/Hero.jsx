import React from "react";
import img1 from "../assets/hero/hero6.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="hero" style={{backgroundImage: `url(${img1})`}}>
      <div className="container">
        <div className="hero-content">
          <h4 className="heading-3">Technology</h4>
          <h1 className="heading-1">for your convenience</h1>
          <p className="body-text-1">
            Shop for electronic products with the latest technology, sophisticated design, guranteed
            quality and fast delivery to the destination.
          </p>
          <button
            className="button-1"
            onClick={() => navigate("/browse?page=1&category=electronic")}
          >
            shop now
          </button>
        </div>
        <div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
