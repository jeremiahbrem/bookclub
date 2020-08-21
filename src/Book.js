import React, { useState, useEffect } from "react";
import { COVER_BASE_URL } from "./config";
import "./Admin.css";
 
function Book({input}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    // let data;
  
    useEffect(() => {
        fetch(`/api/books?bibkeys=ISBN:${input}&format=json&jscmd=details`)
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result[`ISBN:${input}`]);
            setIsLoaded(true);
          },
         
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    })
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            <img src={`${COVER_BASE_URL}b/isbn/${input}-M.jpg`} alt=""/>
            <ul>
              <li>ISBN: {input}</li>
              <li>Title: {items.details.title}</li>
              <li>Link: {items.info_url}</li>
              <li>Author: {items.details.authors[0].name}</li>
              <li>Published: {items.details.publish_date}</li>
            </ul>
        </div>
      );
    }
  }



 
export default Book;