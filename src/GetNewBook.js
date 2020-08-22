import React, { useState, useEffect } from "react";
import { COVER_BASE_URL } from "./config";
import "./GetNewBook.css";
 
function GetNewBook({isbn}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);

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
  } else if (!items) {
    return <div>No Results</div>;
  } else {
    return (
      <div className="search-result">
        <div className="book-img">
          <img src={`${COVER_BASE_URL}b/isbn/${isbn}-M.jpg`} alt=""/>
        </div>
        <div className="details-list">
          <ul>
            <li>ISBN: {isbn}</li>
            <li>Title: {items.details.title}</li>
            <li>Buy Link: <a href={items.info_url}>Click here</a></li>
            <li>Published: {items.details.publish_date}</li>
          </ul>
        </div>
      </div>      
    );
  }
}



 
export default GetNewBook;