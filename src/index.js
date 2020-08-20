import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
 
window.$size = window.innerWidth;

ReactDOM.render(
  <App/>, 
  document.getElementById("root")
);