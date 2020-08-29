import React, { useState } from "react";
import SearchForm from "./SearchForm";
import GetNewBook from "./GetNewBook";
import AddBook from "./AddBook";
import "./Admin.css";
import AdminBookList from "./AdminBookList";
import NewMeeting from "./NewMeeting";
import AdminMeetings from "./AdminMeetings";
import EditMeeting from "./EditMeeting";
import EditBook from "./EditBook";

const { validateIsbn } = require("./utilities/validateIsbn.js");
 
const Admin = () => {

  // set states for showing/hiding elements
  const [isbn, setIsbn] = useState("");
  const [showBookAdded, setShowBookAdded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showBooks, setShowBooks] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [bookItems, setBookItems] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [deleteMeeting, setDeleteMeeting] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const [showEditMeeting, setShowEditMeeting] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const [showEditBookForm, setShowEditBookForm] = useState(false);
  const [showBookUpdated, setShowBookUpdated] = useState(false);
  const [selectValue, setSelectValue] = useState("default");
  const [showMeetingAdded, setShowMeetingAdded] = useState(false);

  return (
    <div>
      <div className="admin-navbar">
        <p onClick={() => {
          setShowSearch(true);
          setShowBooks(false);
          setShowMeetingForm(false);
          setShowMeetings(false);
          setShowEditBookForm(false);
          setIsbn(null);
        }}>Search</p>
        
        <p onClick={() => {
          setShowSearch(false);
          setShowBooks(true);
          setShowMeetingForm(false);
          setShowMeetings(false);
          setShowEditBookForm(false);
          setIsbn(null);
        }}>Books</p>
        
        <p onClick={() => {
          setShowSearch(false);
          setShowBooks(false);
          setShowMeetingForm(false);
          setShowMeetings(true);
          setShowEditBookForm(false);
          setIsbn(null);
        }}>Meetings</p>
      </div>

      {showSearch &&
      <div className="Admin-new-book">
        <h3 className="Admin-search-head">Search New Book</h3>
        <div className="Admin-search-form">
          <SearchForm 
            setIsbn={setIsbn}
            setShowBookAdded={setShowBookAdded}
          />
        </div>

        {isbn &&  
        <div className="Admin-search-result">
          {validateIsbn(isbn) && <GetNewBook 
            isbn={isbn} 
            setShowAddForm={setShowAddForm}
            bookItems={bookItems}
            setBookItems={setBookItems}
            />}
          {(isbn && !validateIsbn(isbn)) && <div className="invalid">Invalid ISBN</div>}
          </div>}    

        <div className="Admin-add-book">
          {bookItems && showAddForm &&
          <AddBook 
            showAddForm={showAddForm}
            showBookAdded={showBookAdded}
            setShowBookAdded={setShowBookAdded}
            setShowAddForm={setShowAddForm}
            isbn={isbn}
            setIsbn={setIsbn}
            bookItems={bookItems}
          />  
          }
          {showBookAdded && <div className="added">Book added!</div>}
        </div>  
      </div>}
      
      <div className="Admin-editBook">
        {showEditBookForm && <EditBook isbn={isbn} 
          setShowEditBookForm={setShowEditBookForm}
          setShowBooks={setShowBooks}
          setShowBookUpdated={setShowBookUpdated}/>}
        {showBookUpdated && <div className="book-updated">Book updated!</div>}  
      </div>

      {showBooks &&
      <div className="Admin-booklist">
        <AdminBookList 
          deleteBook={deleteBook}
          setDeleteBook={setDeleteBook}
          setShowEditBookForm={setShowEditBookForm}
          setShowBooks={setShowBooks}
          setIsbn={setIsbn} />
      </div>}

      {showMeetings &&
      <div className="Admin-meetings">
        <AdminMeetings 
          deleteMeeting={deleteMeeting} 
          setDeleteMeeting={setDeleteMeeting}
          setMeetingId={setMeetingId}
          setShowEditMeeting={setShowEditMeeting}
          setShowMeetings={setShowMeetings}
          setShowMeetingForm={setShowMeetingForm}
          setSelectValue={setSelectValue}
          />  
      </div>}

      {showMeetingForm &&
      <div className="Admin-meeting-form-cont">
        <div id="Admin-meeting-form">
          {showEditMeeting ? <EditMeeting 
            id={meetingId} 
            setShowEditMeeting={setShowEditMeeting}
            setShowMeetings={setShowMeetings}
            setShowMeetingForm={setShowMeetingForm}
            setSelectValue={setSelectValue}
            selectValue={selectValue} /> : 
            <NewMeeting 
              selectValue={selectValue} 
              setSelectValue={setSelectValue}
              setShowMeetingAdded={setShowMeetingAdded}
              setShowBooks={setShowBooks}
              showMeetingAdded={showMeetingAdded}
              setShowMeetingForm={setShowMeetingForm}
            />
          }
          {showMeetingAdded && <div className="meeting-added">Meeting added!</div>} 
        </div>
      </div>}
    </div>  
  )  
}  
    


  export default Admin;