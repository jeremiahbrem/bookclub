import React, { useState, useEffect } from "react";
import "./GetNewBook.css";
 
function GetNewBook({isbn, bookItems, setBookItems, setShowAddForm}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=details`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setBookItems(result[`ISBN:${isbn}`]);
          setIsLoaded(true);
          setShowAddForm(true);
        }  
      })
    .catch((error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
    return () => mounted = false;
  },[isbn, setBookItems, setShowAddForm])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!bookItems) {
    return <div>No Results</div>;
  } else {
    return (
      <div className="search-result">
        <div className="book-img">
          <img src={`/b/isbn/${isbn}-M.jpg`} alt=""/>
        </div>
        <div className="details-list">
          <ul>
            <li>ISBN: {isbn}</li>
            <li>Title: {bookItems.details.title}</li>
            <li>Buy Link: <a href={bookItems.info_url}>Click here</a></li>
            <li>Published: {bookItems.details.publish_date}</li>
          </ul>
        </div>
      </div>      
    );
  }
}



 
export default GetNewBook;