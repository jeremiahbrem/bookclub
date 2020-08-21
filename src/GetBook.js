import React, { useState, useEffect } from "react";
import { COVER_BASE_URL } from "./config";
import AddBook from "./AddBook";
import "./Admin.css";
 
function GetBook({isbn}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [addBook, setAddBook] = useState(false);
  const [newBookData, setNewBookData] = useState({});
  const [bookAdded, setBookAdded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=details`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setItems(result[`ISBN:${isbn}`]);
          setIsLoaded(true);
        }
      },
    
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
    return () => mounted = false;
  })
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>
          <img src={`${COVER_BASE_URL}b/isbn/${isbn}-M.jpg`} alt=""/>
        </div>
          <ul>
            <li>ISBN: {isbn}</li>
            <li>Title: {items.details.title}</li>
            <li>Link: {items.info_url}</li>
            <li>Author: {items.details.authors[0].name}</li>
            <li>Published: {items.details.publish_date}</li>
          </ul>
          {!addBook && <button onClick={() => setAddBook(true)}>Add</button>}
          {addBook && <AddBook 
            setNewBookData={setNewBookData} 
            setAddBook={setAddBook}
            setBookAdded={setBookAdded}
            />}
          {bookAdded && <div>Book added!</div>}  
      </div>
    );
  }
}



 
export default GetBook;