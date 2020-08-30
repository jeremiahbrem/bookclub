import React from "react";
import {ReactComponent as Icon} from '../assets/images/menu-icon.svg';
import {ReactComponent as IconNight} from '../assets/images/menu-icon-night.svg';
import "./MenuIcon.css";

// component for menu icon, which if clicked slides in menu
const MenuIcon = ({ open, setOpen, night }) => {
  return (
    <div className="MenuIcon">
      {!night &&
      <Icon onClick={() => setOpen(!open)}/>}
      {night &&
      <IconNight onClick={() => setOpen(!open)}/>}
    </div>   
  )
}

export default MenuIcon;