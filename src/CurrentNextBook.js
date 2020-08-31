import React, { useState, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./CurrentNextBook.css";
 
const CurrentNextBook = ({ night }) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [current, setCurrent] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/books`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          let books = result.books;
          for (let i = 0; i < books.length; i++) {
            if (Date.parse(books[i].read_date) > Date.parse(Date())) {
              setNext(books[i]);
              break;
            }
            setCurrent(books[i]);
          }
          setIsLoaded(true);
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="CurrentNextBook">
        <div className="CurrentNextBook-book Current-book">
          <h4 className="Current-text">CURRENTLY READING</h4>  
          <div className={`CurrentNextBook-genre ${night && 'CurrentNextBook-genre-night'}`}>
            {current.genre}
          </div>
          <div className="CurrentNextBook-img">
            <Link to={`/book/${current.isbn}`}>
              <img className="slider-img" src={`/b/isbn/${current.isbn}-M.jpg`} alt=""/>
            </Link>  
          </div>
          <div>
            <div className="CurrentNextBook-title-author">
              <p className={`CurrentNextBook-title Current-title ${night && 'CurrentNextBook-title-night'}`}>{current.title}</p>
              <p className="CurrentNextBook-author Current-author">{current.author}</p>
           </div>
          </div>
        </div>
        <div className="CurrentNextBook-book">
          <h4 className={`Next-text ${night && 'CurrentNext-text-night'}`}>NEXT UP</h4>  
          <div className={`CurrentNextBook-genre ${night && 'CurrentNext-text-night'}`}>
            {next.genre}
          </div>
          <div className="CurrentNextBook-img">
            <Link to={`/book/${next.isbn}`}>
              <img className="slider-img" src={`/b/isbn/${next.isbn}-M.jpg`} alt=""/>
            </Link>  
          </div>
          <div>
            <div className="CurrentNextBook-title-author">
              <p className={`CurrentNextBook-title ${night && 'CurrentNext-text-night'}`}>{next.title}</p>
              <p className="CurrentNextBook-author">{next.author}</p>
           </div>
          </div>
        </div>
      </div>
    );
  }
}



 
export default CurrentNextBook;