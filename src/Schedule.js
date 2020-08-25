import React, { useState } from "react";
import "./Schedule.css";

const Schedule = ({setIsbn, setShowBookAdded}) => {
  const [input, setInput] = useState("");
  
  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsbn(input);
    setShowBookAdded(false)
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

  export default Schedule;