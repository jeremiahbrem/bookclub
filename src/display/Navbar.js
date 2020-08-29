import React, { useEffect } from "react";
import MenuIcon from "./MenuIcon";
import {ReactComponent as UserIcon} from '../assets/images/user.svg';
import {ReactComponent as SunriseIcon} from '../assets/images/sunrise.svg';
import {ReactComponent as Logo} from '../assets/images/logo.svg';
import "./Menu.css";

const Navbar = ({open, setOpen, scroll, setScroll}) => {  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    console.log(scroll);

    function handleScroll() {
      setScroll(window.pageYOffset);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll, setScroll]);

    return (
      <div className={scroll > 75 ? "navbar navbar-bg" : "navbar"}>
            <div className="navbar-left">
              <MenuIcon open={open} setOpen={setOpen} className="navbar-menu-icon"/>
              <Logo className="navbar-logo"/>
            </div>
            <div className="navbar-right">
              <SunriseIcon className="navbar-sunrise-icon"/>
              <div className="navbar-day">Day</div>
              <UserIcon className="navbar-user-icon"/>
              <div className="navbar-login">Login</div>
            </div>
    </div>   
    )  
}


export default Navbar;