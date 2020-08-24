import React, { useState } from "react";
// import { BOOK_BASE_URL, COVER_BASE_URL } from "./config";
import SearchForm from "./SearchForm";
import GetNewBook from "./GetNewBook";
import AddBook from "./AddBook";
import { HashLink as Link } from 'react-router-hash-link';
import "./Admin.css";
import AdminBookList from "./AdminBookList";
const { validateIsbn } = require("./utilities/validateIsbn.js");
 
const Admin = () => {
    const [isbn, setIsbn] = useState("");
    const [showBookAdded, setShowBookAdded] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [items, setItems] = useState(null);

    return (
      <div>
        <div className="admin-navbar">
          <Link to="/admin/#search">Search</Link>
          <Link to="/admin/#list">List</Link>
          <Link to="/admin/#search">Schedule</Link>
        </div>
        <div className="Admin-new-book">
          <div id="search"></div>
          <h3 className="Admin-search-head">Search New Book</h3>
          <div className="Admin-search-form">
            <SearchForm 
              setIsbn={setIsbn}
              setShowBookAdded={setShowBookAdded}
            />
          </div>

          <div className="Admin-search-result">
            {validateIsbn(isbn) && <GetNewBook 
              isbn={isbn} 
              setShowAddForm={setShowAddForm}
              items={items}
              setItems={setItems}
              />}
            {(isbn && !validateIsbn(isbn)) && <div className="invalid">Invalid ISBN</div>}
          </div>      

          <div className="Admin-add-book">
            {items &&  
            <AddBook 
              showAddForm={showAddForm}
              showBookAdded={showBookAdded}
              setShowBookAdded={setShowBookAdded}
              setShowAddForm={setShowAddForm}
              isbn={isbn}
              items={items}
            />  
            }
          </div>  
        </div>
        <div className="Admin-bookList">
          <div id="list"></div>
          <AdminBookList/>
        </div>
      </div>
      
    )
  }

  export default Admin;