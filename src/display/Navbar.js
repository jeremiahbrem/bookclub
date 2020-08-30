import React, { useEffect } from "react";
import MenuIcon from "./MenuIcon";
import {ReactComponent as UserIcon} from '../assets/images/user.svg';
import {ReactComponent as SunriseIcon} from '../assets/images/sunrise.svg';
import {ReactComponent as MoonIcon} from '../assets/images/night-icon.svg';
import {ReactComponent as Logo} from '../assets/images/logo.svg';
import {ReactComponent as MenuLogo} from '../assets/images/menu-logo.svg';
import "./Menu.css";

// component for Navbar
const Navbar = ({open, setOpen, scroll, setScroll, night, setNight}) => {  
  const nightClass = night ? "-night" : "";

  // listens for user page scroll and sets scroll state to current page position
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
      setScroll(window.pageYOffset);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll, setScroll]);

    /* returns navbar with menu icon, logo, day/night icon, and login user icon
       if user scrolls from top of page, the navbar background turns white */
    return (
      <div className={scroll > 75 ? `navbar navbar-bg${nightClass}` : "navbar"}>
        <div className="navbar-left">
          <MenuIcon open={open} setOpen={setOpen} night={night} className="navbar-menu-icon"/>
          {!night &&
          <Logo className="navbar-logo"/>}
          {night &&
          <MenuLogo className="Menu-logo"/>}
        </div>
        <div className="navbar-right">
          <div className="navbar-sunrise" onClick={() => setNight(!night)}>
            {!night &&
            <SunriseIcon className="navbar-sunrise-icon"/>}
            {night &&
            <MoonIcon className="navbar-moon"/>}
            <div className="navbar-day">Day</div>
          </div>
          <div className="navbar-user">
            <UserIcon className="navbar-user-icon"/>
            <div className="navbar-login">Login</div>
          </div>
        </div>
    </div>   
    )  
}


export default Navbar;