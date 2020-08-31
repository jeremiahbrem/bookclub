import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import BookSlider from "./BookSlider";
import CurrentNextBook from "./CurrentNextBook";
import "./Books.css";
 
const Books = ({night}) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {

    let mounted = true;
    fetch(`/db/api/books?`)
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
  },[])
  
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
      <div className={`Books ${night && 'Books-night'}`}>
        <h3 className={`Books-my ${night && 'Books-text-night'}`}>My books</h3>
        <div className="Books-inputs">
          <div className="Books-input-cont">
            <label className={`Books-label ${night && 'Books-text-night'}`}>Title:</label>
            <input className="Books-input" name="title"></input>
          </div>
          <div className="Books-input-cont">
            <label className="Books-label">Author:</label>
            <input className="Books-input" name="author"></input>
          </div>
          <div className="Books-input-cont">
            <label className="Books-label">Date of read:</label>
            <input className="Books-input-small" placeholder="MM" name="month"></input>
            <input className="Books-input-small" placeholder="YY" name="year"></input>
          </div>
        </div>
        <div className="Books-container">
          <div className="Books-current-next">
            <CurrentNextBook night={night}/>
          </div>
          <div className="Books-slider-cont">
            <h4 className={`Books-previous ${night && 'Books-text-night'}`}>PREVIOUSLY READ</h4>
            <BookSlider bookScrollCheck={window.innerWidth / 1.8} night={night} className="Books-slider"/>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Books;