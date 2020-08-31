import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./CurrentNextBook.css";
 
// component for displaying current and next books on books page
const CurrentNextBook = ({ night, current, next }) => {

    return ( 
    <div className="CurrentNextBook">
        {/* current book element */}
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
        {/* next book element */}
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



 
export default CurrentNextBook;