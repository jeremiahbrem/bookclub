import React from "react";
import "./Hero.css";

// component for Hero image and text
const Hero = (props) => {    
  return(
    <div className={`Hero-container ${props.night && 'Hero-container-night'}`}>
      <div className="Hero-text">
        <div className={`Hero-text-line ${props.night && 'Hero-text-line-night'}`}>The person, be it gentleman or lady,</div>
        <div className={`Hero-text-line ${props.night && 'Hero-text-line-night'}`}>who has not pleasure in a good novel,</div>
        <div className={`Hero-text-line ${props.night && 'Hero-text-line-night'}`}>must be intolerably stupid.</div>
      </div>
      <div className="Hero-text-mobile">
        <div className={`Hero-text-line ${props.night && 'Hero-text-line-night'}`}>The person, be it gentleman</div>
        <div className={`Hero-text-line ${props.night && 'Hero-text-line-night'}`}>or lady, who has not</div>
        <div className={`Hero-text-line ${props.night && 'Hero-text-line-night'}`}>pleasure in a good novel,</div>
        <div className={`Hero-text-line ${props.night && 'Hero-text-line-night'}`}>must be intolerably stupid.</div>
      </div>
      <div className={`Hero-austen ${props.night && 'Hero-austen-night'}`}>Jane Austen <br/>Northanger Abbey
      </div>
      <div className="Hero">
      </div>
    </div>    
  )
}

export default Hero;