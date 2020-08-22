import React from "react";
import AddBookForm from "./AddBookForm";
import "./AddBook.css";

function AddBook({isbn, setNewBookData, showAddForm, setShowAddForm, showBookAdded, setShowBookAdded}) {

  return (
    <div className="add-book">
      {showAddForm && <AddBookForm
        setNewBookData={setNewBookData} 
        setShowBookAdded={setShowBookAdded}
        setShowAddForm={setShowAddForm}
        isbn={isbn}
        />
      }
      {showBookAdded && <div className="added">Book added!</div>} 
    </div>
  );
}

export default AddBook;