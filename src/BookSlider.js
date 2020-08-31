import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow} from "./assets/images/arrow-right.svg";
import "./BookSlider.css";
 
const BookSlider = ({night, bookScrollCheck}) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [width, setWidth] = useState(0);
  const [right, setRight] = useState(true);
  const [left, setLeft] = useState(false);


  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/books`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setItems(result.books);
          setIsLoaded(true);
          setWidth(result.books.length * 285);
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  }, [width])



  function handleScroll(event) {
    if (width - event.target.scrollLeft <= bookScrollCheck)
      setRight(false);
    else
      setRight(true);

    if (event.target.scrollLeft > 0)
      setLeft(true);
    else
      setLeft(false);  
  }


  const ref = useRef(null);
  
  const scrollLeft = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  
  const scrollRight = (scrollOffset) => {
    ref.current.scrollLeft -= scrollOffset;
  };

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
      <div className={`BookSlider-cont ${night && 'BookSlider-cont-night'}`}>
        <div className="BookSlider" onScroll={handleScroll} ref={ref}>
          {items.map(book => {
            return (  
              <div className="BookSlider-book" key={book.isbn}>
                <div className={`BookSlider-genre ${night && 'BookSlider-genre-night'}`}>
                  {book.genre}
                </div>
                <div className="BookSlider-img">
                  <Link to={`/book/${book.isbn}`}>
                    <img className="slider-img" src={`/b/isbn/${book.isbn}-M.jpg`} alt=""/>
                  </Link>  
                </div>
                <div>
                  <div className="BookSlider-title-author">
                    <p className={`BookSlider-title ${night && 'BookSlider-title-night'}`}>{book.title}</p>
                    <p className="BookSlider-author">{book.author}</p>
                  </div>
                </div>
              </div> 
            )
          })}
        </div>
        
        {left && items.length > 1 && window.innerWidth < items.length * 285 && 
        <div className="BookSlider-left-cont" onClick={() => scrollRight(
            Math.floor(ref.current.clientWidth / 285) * 285)}>
          <div className="BookSlider-btn-left"></div>
          <div className="BookSlider-arrow-left"><Arrow/></div>
        </div>}

        {right && items.length > 1 && window.innerWidth < items.length * 285  &&
        <div className="BookSlider-right-cont" onClick={() => scrollLeft(
            Math.floor(ref.current.clientWidth / 285) * 285)}>
          <div className="BookSlider-btn-right"></div>
          <div className="BookSlider-arrow-right"><Arrow/></div>
        </div>}
      </div>
    );
  }
}



 
export default BookSlider;