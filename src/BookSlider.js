import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow} from "./assets/images/arrow-right.svg";
import "./BookSlider.css";
 
// props include night mode check, slider size check (different for home page and book page)
// also includes user search filters, and date filter for showing only previously read
const BookSlider = ({night, sliderSizeCheck, filters, previousOnly}) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  // slider container width
  const [width, setWidth] = useState(0);
  // show slide to the right button
  const [right, setRight] = useState(true);
  // show slide to the left button
  const [left, setLeft] = useState(false);
  // windowSize for showing/hiding buttons
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    console.log(filters);
    // set current window size after resize for showing/hiding buttons if needed
    function handleResize() {
      setWindowSize(window.innerWidth);
      if (width - ref.current.scrollLeft > (window.innerWidth / sliderSizeCheck))
        setRight(true);
    }

    let mounted = true;
    fetch(`/db/api/books?${filters}`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          if (previousOnly) {
            let filteredBooks = result.books.filter(function(book) {
              return Date.parse(book.read_date) < Date.parse(Date());
            })
            setItems(filteredBooks);
            // sets slider width according to number of books, each about 285px wide
            setWidth(filteredBooks.length * 285);
          }  else {
            setItems(result.books);
            setWidth(result.books.length * 285);
          }  
          setIsLoaded(true);          
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )

    // listen for window resize
    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
    }  
  }, [width, filters, setWindowSize, previousOnly, sliderSizeCheck])

  // handles slider scroll and shows/hide buttons
  function handleScroll(event) {
    console.log(`scrollLeft: ${event.target.scrollLeft}`);
    console.log(`width: ${width}`);
    console.log(`windowSize: ${windowSize}`);
    if (width - event.target.scrollLeft <= (windowSize / sliderSizeCheck))
      setRight(false);
    else
      setRight(true);

    if (event.target.scrollLeft > 0)
      setLeft(true);
    else
      setLeft(false);  
  }

  // set reference for slider element
  const ref = useRef(null);
  
  // updates slider scroll position with left scroll
  const scrollLeft = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  
  // updates slider scroll position with right scroll
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
        {/* if more than one book, and window size is less than book container width */}
        {left && items.length > 1 && (windowSize / sliderSizeCheck) < items.length * 285 && 
        <div className="BookSlider-left-cont" onClick={() => scrollRight(
            Math.floor(ref.current.clientWidth / 285) * 285)}>
          <div className="BookSlider-btn-left"></div>
          <div className="BookSlider-arrow-left"><Arrow/></div>
        </div>}
        {/* if more than one book, and window size is less than book container width */}
        {right && items.length > 1 && (windowSize / sliderSizeCheck) < items.length * 285  &&
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