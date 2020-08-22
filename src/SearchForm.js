import React, { useState } from "react";
import "./SearchForm.css";

const { validateIsbn } = require("./utilities/validateIsbn.js");

const SearchForm = ({setIsbn, setShowAddButton, setShowBookAdded}) => {
  const [input, setInput] = useState("");
  
  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsbn(input);
    if (validateIsbn(input)) {
      setShowAddButton(true);
    }
    else
      setShowAddButton(false);
    setShowBookAdded(false);
    setInput("");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label className="label">Search ISBN</label>
        <input className="input" type="text" value={input} onChange={handleChange} required/>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
}

  export default SearchForm;