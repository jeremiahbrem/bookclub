import React, { useState, useEffect } from "react";
import { COVER_BASE_URL } from "./config";
import "./AdminBookList.css";
 
const AdminBookList = () => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
 

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/books`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setItems(result.books);
          setIsLoaded(true);
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  })

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!items) {
    return (
      <div className="AdminBookList"></div>
    );
  } else {
    return (
      <div className="AdminBookList">
        <h3 className="Admin-list-head">Edit Booklist</h3>
        {items.map(book => {
          return (  
            <div className="AdminBookList-book" key={book.isbn}>    
              <div className="Admin-book-img">
                <img className="Admin-slider-img" src={`${COVER_BASE_URL}b/isbn/${book.isbn}-M.jpg`} alt=""/>
              </div>
              <div className="Admin-book-read">
                <ul>
                  <li>{book.month_year}</li>
                </ul>
              </div>
              <div>
                <button className="Admin-edit-btn">Edit</button>
                <button className="Admin-delete-btn">Delete</button>
              </div>
            </div> 
          )
         })}
      </div>
    );
  }
}



 
export default AdminBookList;