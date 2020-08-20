import React, { Component } from "react";
import "./Intro.css";
 
class Intro extends Component {
  render() {
    return (
      <div className="Intro">
        <h2>Welcome to Our Book Club</h2>
        <p>We love to get together and share thoughts about good books, and we welcome diverse
          views and perspectives. Even the occasional back and forth banter is fun! If you're an
          inquisitive adult of any age who's looking for great fellowship, discussion, and belonging, 
          feel free to contact us about joining the group.
        </p>
      </div>
    );
  }
}
 
export default Intro;