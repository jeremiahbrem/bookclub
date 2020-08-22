import React, { useState } from "react";
// import { BOOK_BASE_URL, COVER_BASE_URL } from "./config";
import SearchForm from "./SearchForm";
import GetNewBook from "./GetNewBook";
import AddBook from "./AddBook";
import "./Admin.css";
const { validateIsbn } = require("./utilities/validateIsbn.js");
 
const Admin = () => {
    const [isbn, setIsbn] = useState("");
    const [showAddButton, setShowAddButton] = useState(false);
    const [showBookAdded, setShowBookAdded] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    return (
      <div className="Admin-new-book">
        <div className="Admin-search-form">
          <SearchForm 
            setIsbn={setIsbn}
            setShowAddButton={setShowAddButton}
            setShowBookAdded={setShowBookAdded}
          />
        </div>

        <div className="Admin-search-result">
          {validateIsbn(isbn) && <GetNewBook isbn={isbn}/>}

          {showAddButton && <button className="add-button" onClick={() => {
              setShowAddForm(true);
              setShowAddButton(false);
            }}>Add Book</button>
          }   
          {(isbn && !validateIsbn(isbn)) && <div className="invalid">Invalid ISBN</div>}
        </div>      

        <div className="Admin-add-book">  
          <AddBook 
            showAddForm={showAddForm}
            showBookAdded={showBookAdded}
            setShowBookAdded={setShowBookAdded}
            setShowAddForm={setShowAddForm}
            isbn={isbn}
          />  
        </div>  
      </div>
    )
  }

  export default Admin;