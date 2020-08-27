import React from "react";
import "./BookSort.css";
 
const BookSort = ({setSort, sort} ) => {

  function handleChange(event) {
    setSort(event.target.value);
  }
  
  return (
  <div className="BookSort">
    <select value={sort} onChange={handleChange}>
      <option value="">Sort by</option>
      <option value="title">Title</option>
      <option value="author">Author</option>
      <option value="read_date">Read Date</option>
    </select>  
  </div>
  );
}

 
export default BookSort;