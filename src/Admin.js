import React, { useState } from "react";
// import { BOOK_BASE_URL, COVER_BASE_URL } from "./config";
import SearchForm from "./SearchForm";
import SearchBook from "./GetBook";
import "./Admin.css";
// import validateIsbn from "./utilities/validateIsbn";
const { validateIsbn } = require("./utilities/validateIsbn.js");
 
const Admin = () => {
    const [isbn, setIsbn] = useState("");
    return (
      <div>
        <SearchForm isbn={isbn} setIsbn={setIsbn} />
        {validateIsbn(isbn) && <SearchBook isbn={isbn}/>}
        {(isbn && !validateIsbn(isbn)) && <div>Invalid isbn</div>}
        
      </div>
    )
  }

  export default Admin;