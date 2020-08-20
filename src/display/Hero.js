import React from "react";
import HeroImage from "../assets/images/bookclub.png";
import "./Hero.css";

const Hero = (props) => {    
  return(
    <div className="Hero-container" style={{backgroundImage: `url(${HeroImage})`}}>
      <h3>Books, Bonds, and Belonging</h3>
    </div>
  )
}

export default Hero;