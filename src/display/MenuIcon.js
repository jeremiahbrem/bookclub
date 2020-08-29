import React from "react";
import {ReactComponent as Icon} from '../assets/images/menu-icon.svg';
import "./MenuIcon.css";

// component for menu icon, which if clicked slides in menu
const MenuIcon = ({ open, setOpen }) => {
  return (
    <div className="MenuIcon">
      <Icon onClick={() => setOpen(!open)}/>
    </div>   
  )
}

export default MenuIcon;