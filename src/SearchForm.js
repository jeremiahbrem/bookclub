import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({isbn, setIsbn}) => {
  const [input, setInput] = useState("");
  
  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsbn(input);
    setInput("");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label className="label">Search ISBN</label>
        <input className="input" type="text" value={input} onChange={handleChange} required/>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>  
  );
}

  export default SearchForm;