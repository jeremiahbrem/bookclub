import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
 
window.$size = window.innerWidth;

ReactDOM.render(
  <App/>, 
  document.getElementById("root")
);