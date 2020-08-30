import React from "react";
import Intro from "./Intro";
import Hero from "./display/Hero";
import BookQuote from "./BookQuote";
import BookSlider from "./BookSlider";
import UpcomingMeetings from "./UpcomingMeetings";
import Contact from "./Contact";
import "./Home.css";
 
// component for home page
const Home = ({setSelectedMeeting, open, night}) => {
  
    return (
      <div className={open ? "Home Home-hidden" : "Home Home-show"}>
        <Hero night={night}/>
        <Intro night={night}/>
        <BookQuote night={night}/>
        <BookSlider night={night}/>
        <UpcomingMeetings setSelectedMeeting={setSelectedMeeting} night={night}/>
        <Contact />
      </div>
    );
  }
 
export default Home;