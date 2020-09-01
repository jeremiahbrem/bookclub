import React from "react";
import Intro from "./Intro";
import Hero from "./display/Hero";
import BookQuote from "./BookQuote";
import BookSlider from "./BookSlider";
import UpcomingMeetings from "./UpcomingMeetings";
import Contact from "./Contact";
import "./Home.css";
 
// component for home page
const Home = ({open, night}) => {
   
    return (
      <div className={open ? "Home Home-hidden" : "Home Home-show"}>
        <Hero night={night}/>
        <Intro night={night}/>
        <BookQuote night={night}/>
        <BookSlider night={night} sliderSizeCheck={1}/>
        <UpcomingMeetings night={night}/>
        <Contact />
      </div>
    );
  }
 
export default Home;