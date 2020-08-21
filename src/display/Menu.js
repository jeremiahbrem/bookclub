import React from "react";
import { NavLink } from "react-router-dom";
import { bool } from 'prop-types';
import "./Menu.css";

const Menu = ({open, setOpen}) => {
    return (
      <div className="menu" style={{transform: (open) ? 'translateX(0)' : 'translateX(-150%)'}}>
        <ul>
          <li><NavLink onClick={() => setOpen(!open)} className="link" to="/" exact>Home</NavLink></li>
          <li><NavLink onClick={() => setOpen(!open)} className="link" to="/books">Books</NavLink></li>
          <li><NavLink onClick={() => setOpen(!open)} className="link" to="/contact">Contact</NavLink></li>
          <li><NavLink onClick={() => setOpen(!open)} className="link" to="/schedule">Schedule</NavLink></li>
        </ul>
      </div>   
    )  
}

Menu.propTypes = {
    open: bool.isRequired,
  }

export default Menu;