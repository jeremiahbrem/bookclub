import React from "react";
import "./BookForm.css";

const BookForm = ({handleChange, handleSubmit, ...props}) => {
  
  return (
    <div className="Bookform">
      <form onSubmit={handleSubmit}>
        <label className="Bookform-label">Add Synopsis</label>
        <textarea className="Bookform-textarea" type="text" name="synopsis" 
          value={props.synopsis} onChange={handleChange} required/>
        
        <label className="Bookform-label">Add Genre</label>
        <input className="Bookform-input" type="text" name="genre" 
          value={props.genre} onChange={handleChange} required/>
        
        <label className="Bookform-label">Add Read Date</label>
        <input className="Bookform-input" type="date" name="read_date" 
          value={props.read_date} onChange={handleChange} required/>
        
        <label className="Bookform-label">Add Author</label>
        <input className="Bookform-input" type="text" name="author" 
          value={props.author} onChange={handleChange} required/>
        
        <button className="Bookform-btn" type="submit">Submit</button>
      </form>
    </div>  
  );
}

  export default BookForm;