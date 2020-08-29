import React from "react";
import {ReactComponent as Icon} from '../assets/images/menu-icon.svg';
import "./MenuIcon.css";

const MenuIcon = ({ open, setOpen }) => {
  return (
    <div className="MenuIcon">
      <Icon onClick={() => setOpen(!open)}/>
    </div>   
  )
}

export default MenuIcon;