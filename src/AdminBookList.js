import React, { useState, useEffect } from "react";
// import { COVER_BASE_URL } from "./config";
import DeleteBook from "./DeleteBook";
import "./AdminBookList.css";
 
const AdminBookList = ({deleteBook, setDeleteBook}) => {
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
  }, [setItems, setIsLoaded, setDbError])

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
          if (deleteBook === book.isbn) {
            return <div><DeleteBook isbn={book.isbn}/></div>
          }
          return (  
            <div className="AdminBookList-book" key={book.isbn}>    
              <div className="Admin-book-img">
                <img className="Admin-slider-img" src={`/b/isbn/${book.isbn}-M.jpg`} alt=""/>
              </div>
              <div className="Admin-book-read">
                <ul>
                  <li>{book.month_year}</li>
                </ul>
              </div>
              <div>
                <button className="Admin-edit-btn">Edit</button>
                <button onClick={() => setDeleteBook(book.isbn)} className="Admin-delete-btn">Delete</button>
              </div>
            </div> 
          )
         })}
      </div>
    );
  }
}



 
export default AdminBookList;