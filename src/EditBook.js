import React, { useState, useEffect } from "react";
import BookForm from "./BookForm";
import "./EditBook.css";
const { updateBook } = require("./utilities/updateBook.js");

// isbn, title, synopsis, genre, publish_date, info_url, read_date, author

function EditBook({
    isbn,
    setShowEditBookForm,
    setShowBooks,
    setShowBookUpdated
  }) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);  
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [read_date, setReadDate] = useState("");
  const [author, setAuthor] = useState("");  

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/books/${isbn}`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          const resp = result.book;
          setSynopsis(resp.synopsis);
          setGenre(resp.genre);
          setReadDate(resp.read_date);
          setAuthor(resp.author);
          setIsLoaded(true);
        }
      })
    .catch((error) => {
        setError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  },[isbn])  
  
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
    updateBook({
      isbn, 
      synopsis, 
      genre, 
      read_date, 
      author
    });
    setShowEditBookForm(false);
    setShowBookUpdated(true);
    setTimeout(() => {
      setShowBookUpdated(false);
      setShowBooks(true);
    }, 3000);
    setSynopsis("");
    setGenre("");
    setReadDate("");
    setAuthor("");
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div className="EditBook-form">   
          <h3 className="EditBook-head">Edit Book</h3> 
          <div className="EditBook-img">
            <img src={`/b/isbn/${isbn}-M.jpg`} alt=""/>
          </div>
          <div className="EditBook-details">
            <BookForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                synopsis={synopsis}
                genre={genre}
                author={author}
                read_date={read_date}
            />
          </div>  
        </div>  
    );
  }  
}

export default EditBook;