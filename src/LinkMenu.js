import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class DesktopMenu extends Component {
  render() {
    return (
      <div className="navbar-links">
      <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/stuff">Books</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/contact">Schedule</NavLink></li>
        </ul>
      </div>   
    )
  }
  
}

export default DesktopMenu;