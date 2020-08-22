import React, { useState, useEffect } from "react";
import { COVER_BASE_URL } from "./config";
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
      },
      (error) => {
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
    return <div>No Results</div>;
  } else {
    return (
      <div className="BookSlider">
        {items.map(book => {
          return (  
            <div className="BookSlider-book">    
              <div className="book-img">
                <img src={`${COVER_BASE_URL}b/isbn/${book.isbn}-M.jpg`} alt=""/>
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