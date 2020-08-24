import React, { useState, useEffect } from "react";
import { COVER_BASE_URL } from "./config";
import { Link } from 'react-router-dom';
import "./BookSlider.css";
 
const BookSlider = () => {
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
      <div className="BookSlider"></div>
    );
  } else {
    return (
      <div className="BookSlider">
        {items.map(book => {
          return (  
            <div className="BookSlider-book" key={book.isbn}>    
              <div className="book-img">
                <Link to={`/book/${book.isbn}`}>
                  <img className="slider-img" src={`${COVER_BASE_URL}b/isbn/${book.isbn}-M.jpg`} alt=""/>
                </Link>  
              </div>
              <div className="book-read">
                <ul>
                  <li>{book.month_year}</li>
                </ul>
              </div>
            </div> 
          )
         })}
      </div>
    );
  }
}



 
export default BookSlider;