import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { bool, func } from 'prop-types';
import "./Burger.css";

const Burger = ({ open, setOpen }) => {
  return (
    <div open={open} onClick={() => setOpen(!open)}>
      <FontAwesomeIcon className="icon" icon={faBars} />
    </div>   
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;