import React from "react";

const SearchForm = ({input, setInput}) => {
  
    function handleChange(event) {
      setInput(event.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
          <label>Search ISBN</label>
            <input type="text" value={input} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
    );
  }

  export default SearchForm;