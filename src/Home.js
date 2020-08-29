import React from "react";
import Intro from "./Intro";
import Hero from "./display/Hero";
import BookQuote from "./BookQuote";
import BookSlider from "./BookSlider";
import UpcomingMeetings from "./UpcomingMeetings";
import "./Home.css";
 
// component for home page
const Home = ({setSelectedMeeting, open}) => {
  
    return (
      <div className={open ? "Home Home-hidden" : "Home Home-show"}>
        <Hero/>   
        <Intro/>
        <BookQuote/>
        <BookSlider/>
        <UpcomingMeetings setSelectedMeeting={setSelectedMeeting} />
      </div>
    );
  }
 
export default Home;