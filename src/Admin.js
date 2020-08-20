import React, { Component } from "react";
// import "./Intro.css";
 
class Admin extends Component {
  render() {
    return (
      <div className="Intro">
        <h2>Admin Page</h2>
        <h4>Search ISBN</h4>
        <form>
            <input type="search" name="isbnSearch" id="isbnSearch" placeholder="Enter ISBN#"/>
        </form>
      </div>
    );
  }
}
 
export default Admin;