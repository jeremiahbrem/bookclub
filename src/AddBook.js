import React, { useState } from "react";
import "./SearchForm.css";

const AddBook = ({setNewBookData, setAddBook, setBookAdded}) => {
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [read_date, setReadDate] = useState("");
  
  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
    if (name === 'synopsis')
      setSynopsis(target.value);
    else if (name === 'genre')
      setGenre(target.value);
    else
      setReadDate(target.value);    
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNewBookData({synopsis, genre, read_date});
    setAddBook(false);
    setBookAdded(true);
    setSynopsis("");
    setGenre("");
    setReadDate("");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label className="label">Add Synopsis</label>
        <input className="input" type="text" name="synopsis" value={synopsis} onChange={handleChange} required/>
        <label className="label">Add Genre</label>
        <input className="input" type="text" name="genre" value={genre} onChange={handleChange} required/>
        <label className="label">Add Read Date</label>
        <input className="input" type="text" name="read_date" value={read_date} onChange={handleChange} required/>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>  
  );
}

  export default AddBook;