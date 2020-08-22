import React, { Component } from "react";
import Intro from "./Intro";
import Hero from "./display/Hero";
import BookSlider from "./BookSlider";
// import Book from "./models/BookClass";
 
class Home extends Component {
  render() {
    return (
      <div>
        <Hero/>
        <Intro/>
        <BookSlider/>
      </div>
    );
  }
}
 
export default Home;