import React from "react";
import { NavLink } from 'react-router-dom';
import {ReactComponent as X} from '../assets/images/x.svg';
import {ReactComponent as MenuLogo} from '../assets/images/menu-logo.svg';
import "./Menu.css";

// component for slide in Menu
const Menu = ({open, setOpen, night}) => {

  /* returns slide out X button, menu logo, and component links, which if clicked 
     close menu */
    return (
      <div className={open ? "Menu Menu-in" : "Menu Menu-out"}>
        <X className="Menu-x" onClick={() => setOpen(!open)}/>
        <MenuLogo className="Menu-logo"/>
        <ul className="Menu-ul">
          <li className="Menu-li">
            <NavLink 
              activeStyle={{color: "lightseagreen"}}
              exact to={"/"} 
              onClick={() => setOpen(!open)}>HOME
            </NavLink>
          </li>
          <li className="Menu-li">
            <NavLink
              to={"/books"} 
              activeStyle={{color: "lightseagreen"}}
              onClick={() => setOpen(!open)}>BOOKS
            </NavLink>
          </li>
          <li className="Menu-li">
            <NavLink
              to={"/schedule"} 
              activeStyle={{color: "lightseagreen"}}
              onClick={() => setOpen(!open)}>SCHEDULE
            </NavLink>
          </li>
        </ul>
      </div>   
    )  
}


export default Menu;