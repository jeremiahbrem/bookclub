import React, { useState } from "react";
import Hero from "./Hero";
import "./App.css"
import { Route, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import Burger from "./Burger";
import Menu from "./Menu";

function App () {
    const [open, setOpen] = useState(false);
    return (
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
            <div className="links">
              <Burger open={open} setOpen={setOpen}/>
            </div>  
            <div className="headline">
              <h1>Our Book Club</h1>
            </div>
            <div className="login">
              <a href="#">Login</a>
            </div>
            <Menu open={open} setOpen={setOpen}/>
          </div>
     
          <Hero />
         
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </BrowserRouter>
        
    );
  
}
 
export default App;


/* <span>Photo by <a href="https://unsplash.com/@tomhermans?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tom Hermans</a> on <a href="https://unsplash.com/s/photos/book?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */