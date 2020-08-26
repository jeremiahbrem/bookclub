import React from "react";
import Intro from "./Intro";
import Hero from "./display/Hero";
import BookSlider from "./BookSlider";
import UpcomingMeetings from "./UpcomingMeetings";
 
const Home = ({setSelectedMeeting}) => {
  
    return (
      <div>
        <Hero/>       
        <Intro/>
        <BookSlider />
        <UpcomingMeetings setSelectedMeeting={setSelectedMeeting} />
      </div>
    );
  }
 
export default Home;