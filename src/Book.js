import React, { useState, useEffect } from "react";
import { COVER_BASE_URL } from "./config";
import "./Book.css";
 
const Book = ({ match }) => {
    const {
      params: { isbn }
    } = match;
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(null);
 

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/books/${isbn}`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setItem(result.book);
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
  } else if (!item) {
    return (
      <div className="Book"></div>
    );
  } else {
    return (
      <div className="Book">   
        <div className="bg-image">f</div> 
        <div className="Book-img">
          <img src={`${COVER_BASE_URL}b/isbn/${item.isbn}-M.jpg`} alt=""/>
        </div>
        <div className="Book-details">
          <ul>
            <li>ISBN: {item.isbn}</li>
            <li>Title: {item.title}</li>
            <li>Author: {item.author}</li>
            <li>Genre: {item.genre}</li>
            <li>Synopsis: {item.synopsis}</li>
            <li>Read Date: {item.month_year}</li>
            <li>Buy Link: <a href={item.info_url}>Click here</a></li>
            <li>Published: {item.publish_date}</li>
          </ul>
        </div>
      </div> 
    );
  }
}



 
export default Book;