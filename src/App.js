import React, { useState } from "react";
import "./App.css"
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Books from "./Books";
import Schedule from "./Schedule";
import Contact from "./Contact";
import Book from "./Book";
import Menu from "./display/Menu";
import Login from "./Login";
import Admin from "./Admin";
import NavBar from "./display/Navbar";
function App () {
    const [open, setOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [scroll, setScroll] = useState(0);
  
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar scroll={scroll} open={open} setOpen={setOpen} setScroll={setScroll}/>
          <Menu open={open} setOpen={setOpen} />
          <div className="content">
            <Route exact path="/" render={props => 
              (<Home {...props} setSelectedMeeting={setSelectedMeeting} open={open}/>)}/>
            <Route path="/books" component={Books}/>
            <Route exact path="/book/:isbn" component={Book}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/schedule" render={props => 
              (<Schedule {...props} 
                selectedMeeting={selectedMeeting}
                setSelectedMeeting={setSelectedMeeting}
              />)}/>
            <Route path="/login" component={Login}/>
            <Route path="/admin" component={Admin}/>
          </div>
        </div>
      </BrowserRouter>
        
    );
  
}
 
export default App;


/* <span>Photo by <a href="https://unsplash.com/@tomhermans?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tom Hermans</a> on <a href="https://unsplash.com/s/photos/book?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */