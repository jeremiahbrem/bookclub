import React, { useState } from "react";
// import { BOOK_BASE_URL, COVER_BASE_URL } from "./config";
import SearchForm from "./SearchForm";
import Book from "./Book";
import "./Admin.css";
 
const Admin = () => {
    const [input, setInput] = useState("");
    return (
      <div>
        <SearchForm input={input} setInput={setInput} />
        {input && <Book input={input}/>}
        
      </div>
    )
  }

  export default Admin;