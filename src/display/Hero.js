import React from "react";
import "./Hero.css";

// component for Hero image and text
const Hero = (props) => {    
  return(
    <div className="Hero-container">
      <div className="Hero-text">
        <div className="Hero-text-line">The person, be it gentleman or lady,</div>
        <div className="Hero-text-line">who has not pleasure in a good novel,</div>
        <div className="Hero-text-line">must be intolerably stupid.</div>
      </div>
      <div className="Hero-text-mobile">
        <div className="Hero-text-line">The person, be it gentleman</div>
        <div className="Hero-text-line">or lady, who has not</div>
        <div className="Hero-text-line">pleasure in a good novel,</div>
        <div className="Hero-text-line">must be intolerably stupid.</div>
      </div>
      <div className="Hero-austen">Jane Austen <br/>Northanger Abbey
      </div>
      <div className="Hero">
      </div>
    </div>    
  )
}

export default Hero;