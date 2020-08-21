import React, { Component } from "react";
import Intro from "./Intro";
import Hero from "./display/Hero";
// import Book from "./models/BookClass";
 
class Home extends Component {
  render() {
    return (
      <div>
        <Hero/>
        <Intro/>
      </div>
    );
  }
}
 
export default Home;