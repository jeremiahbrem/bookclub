import React, { useState } from "react";
import "./AddBookForm.css";
const { addNewBook } = require("./utilities/addNewBook.js");

const AddBookForm = ({setNewBookData, setShowBookAdded, setShowAddForm, isbn}) => {
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [read_date, setReadDate] = useState("");
  
  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
    if (name === 'synopsis')
      setSynopsis(target.value);
    else if (name === 'genre')
      setGenre(target.value);
    else
      setReadDate(target.value);    
  }

  function handleSubmit(event) {
    event.preventDefault();
    // setNewBookData({synopsis, genre, read_date});
    addNewBook({isbn, synopsis, genre, read_date});
    setShowBookAdded(true);
    setShowAddForm(false);
    setSynopsis("");
    setGenre("");
    setReadDate("");
  }

  return (
    <div className="add-book-form">
      <form onSubmit={handleSubmit}>
        <label className="add-label">Add Synopsis</label>
        
        <textarea className="add-textarea" type="text" name="synopsis" 
          value={synopsis} onChange={handleChange} />
        
        <label className="add-label">Add Genre</label>
        
        <input className="add-input" type="text" name="genre" 
          value={genre} onChange={handleChange} />
        
        <label className="add-label">Add Read Date</label>
        
        <input className="add-input" type="text" name="read_date" 
          value={read_date} onChange={handleChange} />
        
        <input className="add-book-btn" type="submit" value="Submit" />
      </form>
    </div>  
  );
}

  export default AddBookForm;