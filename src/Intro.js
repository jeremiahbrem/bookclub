import React from "react";
import "./Intro.css";
 
// component for intro section with image and text fields
const Intro = ({night}) => {
  return (
    <div className={`Intro ${night && 'Intro-night'}`}>
      <div className="Intro-img"></div>
      <p className={`Intro-text ${night && 'Intro-text-night'}`}>
        You then roused his anger by calling him names 
        at a moment when he felt that he had deserved 
        your warmest thanks.<br/><br/> 
        
        He could not explain the true state of affairs 
        without betraying one who certainly deserved 
        little enough consideration at his hands. He took 
        the more chivalrous view, however, and 
        preserved her secret.
      </p>
    </div>
  );

}
 
export default Intro;