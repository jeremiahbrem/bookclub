import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Books.css";
 
const Books = () => {
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
      <div className="Books"></div>
    );
  } else {
    return (
      <div className="Books">
        <div className="Books-bg-image"></div> 
        <div className="Books-cont">
          {items.map(book => {
            return (  
              <div className="Books-book" key={book.isbn}>   
                <div className="Books-img">
                  <Link to={`/book/${book.isbn}`}>
                    <img className="Books-img" src={`/b/isbn/${book.isbn}-M.jpg`} alt=""/>
                  </Link>  
                </div>
                <div className="Books-details">
                  <ul>
                    <li>Title: {book.title}</li>
                    <li>Author: {book.author}</li>
                    <li>Genre: {book.genre}</li>
                    <li>Schedule: {book.month_year}</li>
                  </ul>
                </div>
              </div> 
            )
          })}
        </div>
      </div>
    );
  }
}
 
export default Books;