import React from "react";
import AddBookForm from "./AddBookForm";
import "./AddBook.css";

function AddBook({isbn, showAddForm, setShowAddForm, showBookAdded, setShowBookAdded, items}) {
  return (
    <div className="add-book">
      {showAddForm && <AddBookForm
        setShowBookAdded={setShowBookAdded}
        setShowAddForm={setShowAddForm}
        isbn={isbn}
        items={items}
        />
      }
      {showBookAdded && <div className="added">Book added!</div>} 
    </div>
  );
}

export default AddBook;