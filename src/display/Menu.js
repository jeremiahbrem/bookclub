import React from "react";
import {ReactComponent as X} from '../assets/images/x.svg';
import {ReactComponent as MenuLogo} from '../assets/images/menu-logo.svg';
import "./Menu.css";

const Menu = ({open, setOpen}) => {

    return (
      <div className={open ? "Menu Menu-in" : "Menu Menu-out"}>
        <X className="Menu-x" onClick={() => setOpen(!open)}/>
        <MenuLogo className="Menu-logo"/>
        <ul className="Menu-ul">
          <li className="Menu-li" onClick={() => setOpen(!open)}>HOME</li>
          <li className="Menu-li" onClick={() => setOpen(!open)}>BOOKS</li>
          <li className="Menu-li" onClick={() => setOpen(!open)}>SCHEDULE</li>
        </ul>
      </div>   
    )  
}


export default Menu;