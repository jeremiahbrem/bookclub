import React, { useEffect, useState } from "react";
import BookSlider from "./BookSlider";
import CurrentNextBook from "./CurrentNextBook";
import UpcomingMeetings from "./UpcomingMeetings";
import Contact from "./Contact";
import "./Books.css";
 
const Books = ({night, open}) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // next book reading
  const [next, setNext] = useState(null);
  // current book reading
  const [current, setCurrent] = useState(null);
  
  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
    if (name === 'title')
      setTitle(target.value);
    else if (name === 'author')
      setAuthor(target.value);
    else if (name === 'month')
      setMonth(target.value);
    else
      setYear(target.value);
  }

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/books`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          // api returns books in ascending order of book reading date   
          let books = result.books;
          // sets next book reading to first book found after current date
          // sets current book reading to last book in results array before next reading  
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
  }, [setCurrent, setNext, title, author])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={open ? "Books-wrapper Books-wrapper-hidden" : 
        "Books-wrapper Books-wrapper-show"}>
        <div className={`Books ${night && 'Books-night'}`}>
          <h3 className={`Books-my ${night && 'Books-text-night'}`}>My books</h3>
          <div className="Books-inputs">
            <div className="Books-input-cont">
              <label className={`Books-label ${night && 'Books-text-night'}`}>Title:</label>
              <input className="Books-input" name="title" onChange={handleChange}></input>
            </div>
            <div className="Books-input-cont">
              <label className={`Books-label ${night && 'Books-text-night'}`}>Author:</label>
              <input className="Books-input" name="author" onChange={handleChange}></input>
            </div>
            <div className="Books-input-cont">
              <label className={`Books-label ${night && 'Books-text-night'}`}>Date of read:</label>
              <input className="Books-input-small" placeholder="MM" name="month" onChange={handleChange}></input>
              <input className="Books-input-small" placeholder="YY" name="year" onChange={handleChange}></input>
            </div>
          </div>
          <div className="Books-container">
            <div className="Books-current-next">
              <CurrentNextBook night={night} current={current} next={next}/>
            </div>
            <div className="Books-slider-cont">
              {/* show PREVIOUS if no user search inputs */}
              {title === "" && author === "" && month === "" && year === "" &&
              <h4 className={`Books-previous ${night && 'Books-text-night'}`}>PREVIOUSLY READ</h4>}
              {/* slider element, accepts partial window width prop for half screen slider 
                  accepts current date prop for returning previously read books*/}
              <BookSlider 
                // slider check value for button show/hide, different for mobile view
                sliderSizeCheck={window.innerWidth > 720 ? 1.8 : 1}
                night={night}
                className="Books-slider"
                // show all previously read books if not user search input
                previousOnly={!title && !author && !month && !year && true}
                // user search input
                filters={`read_date=${(month && year) ? `20${year}-${month}` : ""}` +
                  `&title=${title}&author=${author}`}
              />
            </div>
          </div>
        </div>
        <UpcomingMeetings night={night}/>
        <Contact night={night}/>
      </div>  
    );
  }
}
 
export default Books;