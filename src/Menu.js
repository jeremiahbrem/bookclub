import React from "react";
import { NavLink } from "react-router-dom";
import { bool } from 'prop-types';
import "./Menu.css";

const Menu = ({open}) => {
    return (
    <div className="menu" style={{transform: (open) ? 'translateX(0)' : 'translateX(-100%)'}}>
      <ul>
          <li><NavLink className="link" to="/">Home</NavLink></li>
          <li><NavLink className="link" to="/stuff">Books</NavLink></li>
          <li><NavLink className="link" to="/contact">Contact</NavLink></li>
          <li><NavLink className="link" to="/contact">Schedule</NavLink></li>
        </ul>
      </div>   
    )  
}

Menu.propTypes = {
    open: bool.isRequired,
  }

export default Menu;