import React, { useState } from "react";
import BookForm from "./BookForm";
import "./AddBook.css";
const { addNewBook } = require("./utilities/addNewBook.js");

function AddBook({
    isbn, 
    setIsbn,
    setShowAddForm, 
    setShowBookAdded, 
    bookItems
  }) {

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
    addNewBook({
      isbn, 
      title: bookItems.details.title, 
      synopsis, 
      genre, 
      publish_date: bookItems.details.publish_date,
      info_url: bookItems.info_url, 
      read_date, 
      author
    });
    setShowBookAdded(true);
    setTimeout(() => {
      setShowBookAdded(false)
    }, 5000);
    setShowAddForm(false);
    setIsbn("");
    setSynopsis("");
    setGenre("");
    setReadDate("");
    setAuthor("");
  }

  return (
    <div className="add-book-form">
      <BookForm 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        synopsis={synopsis}
        genre={genre}
        author={author}
        read_date={read_date}
      />  
    </div>  
  );
}

export default AddBook;