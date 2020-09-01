import React, { useState, useEffect } from "react";
import { ReactComponent as Arrow} from "./assets/images/arrow-right.svg";
import { ReactComponent as ArrowDark} from "./assets/images/arrow-right-dark.svg";
import { Link } from 'react-router-dom';
import UpcomingMeetings from "./UpcomingMeetings";
import Contact from "./Contact";
import "./Book.css";
 
const Book = ({ match, night, open }) => {
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
  }, [isbn]);

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
      <div className={open ? "Book-wrapper Book-wrapper-hidden" : 
      "Book-wrapper Book-wrapper-show"}>
        <div className={`Book ${night && 'Book-night'}`}>
          <div className="Book-back">
            {night &&
            <Arrow className="Book-arrow-night"/>}
            {!night && 
            <ArrowDark className="Book-arrow"/>}
            <Link to={`/books`}>
              <div className={`Book-back-text ${night && 'Book-title-night'}`}>Back to results</div>
            </Link>
          </div>
          <div className="Book-img-cont">
            <img className="Book-img" src={`/b/isbn/${item.isbn}-M.jpg`} alt=""/>
          </div>
          <div className="Book-details">
            <div className={`Book-title ${night && 'Book-title-night'}`}>{item.title}</div>
            <div className={`Book-subtitle ${night && 'Book-title-night'}`}>This is subtitle text</div>
            <div className={`Book-publish`}>Hardcover, 1007 pages<br/><i>{item.publish_date}</i></div>
            <div className={`Book-synopsis ${night && 'Book-title-night'}`}>{item.synopsis}</div>
            <button className="Book-button"><p>14.99 Buy</p></button>
          </div>
        </div>
        <UpcomingMeetings night={night}/>
        <Contact night={night}/>
      </div> 
    );
  }
}



 
export default Book;