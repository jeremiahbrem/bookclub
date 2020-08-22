import React from "react";
import Image from "../assets/images/bookslider.png";
import "./Hero.css";

const Hero = (props) => {    
  return(
    <div className="Slider-container" style={{backgroundImage: `url(${Image})`}}>
      <h3>Books, Bonds, and Belonging</h3>
    </div>
  )
}

export default Hero;