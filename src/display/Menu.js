import React from "react";
import { NavLink } from "react-router-dom";
import { bool } from 'prop-types';
import "./Menu.css";

const Menu = ({open, setOpen}) => {
    return (
      <div className="menu" style={{transform: (open) ? 'translateX(0)' : 'translateX(-150%)'}}>
        <ul className="menu-ul">
          <li className="menu-li"><NavLink onClick={() => setOpen(!open)} className="menu-link" to="/" exact>Home</NavLink></li>
          <li className="menu-li"><NavLink onClick={() => setOpen(!open)} className="menu-link" to="/books">Books</NavLink></li>
          <li className="menu-li"><NavLink onClick={() => setOpen(!open)} className="menu-link" to="/contact">Contact</NavLink></li>
          <li className="menu-li"><NavLink onClick={() => setOpen(!open)} className="menu-link" to="/schedule">Schedule</NavLink></li>
        </ul>
      </div>   
    )  
}

Menu.propTypes = {
    open: bool.isRequired,
  }

export default Menu;