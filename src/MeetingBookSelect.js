import React, { useState, useEffect } from "react";
// import "./BookSlider.css";
 
const MeetingBookSelect = ({id, selectValue, setSelectValue}) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/books`)
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
  }, []);

  function handleChange(event) {
    setSelectValue(event.target.value);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!items) {
    return (
      <div className="BookSelect">None</div>
    );
  } else {
    return (
      <div className="BookSelect">
        <select value={selectValue} onChange={handleChange} 
          name="book_id" id="book_id" className="Select" placeholder="Select book">
          <option value="default" disabled>Select book</option>  
          {items.map(book => {
            return (
              <option key={book.isbn} value={book.id}>
                {book.title.length > 40 ? book.title.slice(0,40) + '...' : book.title}
              </option>
            )
          })}
        </select>
      </div>
    );
  }
}

 
export default MeetingBookSelect;