import React, { useState } from "react";
import "./AddBookForm.css";
const { addNewBook } = require("./utilities/addNewBook.js");

const AddBookForm = ({setShowBookAdded, setShowAddForm, isbn}) => {
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [read_date, setReadDate] = useState("");
  const [author, setAuthor] = useState("");
  
  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
    if (name === 'synopsis')
      setSynopsis(target.value);
    else if (name === 'genre')
      setGenre(target.value);
    else if (name === 'read_date')
      setReadDate(target.value);  
    else
      setAuthor(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewBook({isbn, synopsis, genre, read_date, author});
    setShowBookAdded(true);
    setShowAddForm(false);
    setSynopsis("");
    setGenre("");
    setReadDate("");
    setAuthor("");
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
        <input className="add-input" type="date" name="read_date" 
          value={read_date} onChange={handleChange} />
        
        <label className="add-label">Add Author</label>
        <input className="add-input" type="text" name="author" 
          value={author} onChange={handleChange} />
        
        <input className="add-book-btn" type="submit" value="Submit" />
      </form>
    </div>  
  );
}

  export default AddBookForm;