import React from "react";
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
        <MenuLogo className={`Menu-logo ${night && 'Menu-logo-night'}`}/>
        <ul className="Menu-ul">
          <li className="Menu-li" onClick={() => setOpen(!open)}>HOME</li>
          <li className="Menu-li" onClick={() => setOpen(!open)}>BOOKS</li>
          <li className="Menu-li" onClick={() => setOpen(!open)}>SCHEDULE</li>
        </ul>
      </div>   
    )  
}


export default Menu;