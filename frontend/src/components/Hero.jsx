import React from "react";
import img1 from '../assets/hero/hero3.jpg'
import img2 from '../assets/hero/hero2.png'
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate()
  return (
    <section id="hero">
      <div className="container">
        <div className="hero-content">
          <h4 className="heading-3">heading</h4>
          <h1 className="heading-1">Heading</h1>
          <p className="body-text-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            dignissimos autem error ipsa dolorem. Ducimus nobis debitis cum
            provident culpa.
          </p>
          <button className="button-1" onClick={()=>navigate('/browse?page=1&category=electronic')}>shop now</button>
        </div>
        <div className="hero-img">
          <img src={img1} alt="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
