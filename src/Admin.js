import React, { useState } from "react";
import SearchForm from "./SearchForm";
import GetNewBook from "./GetNewBook";
import AddBook from "./AddBook";
import { HashLink as Link } from 'react-router-hash-link';
import "./Admin.css";
import AdminBookList from "./AdminBookList";
import NewMeeting from "./NewMeeting";
import AdminMeetings from "./AdminMeetings";
import EditMeeting from "./EditMeeting";
const { validateIsbn } = require("./utilities/validateIsbn.js");
 
const Admin = () => {
  const [isbn, setIsbn] = useState("");
  const [showBookAdded, setShowBookAdded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showBooks, setShowBooks] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [items, setItems] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [deleteMeeting, setDeleteMeeting] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const [showEditMeeting, setShowEditMeeting] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);

  return (
    <div>
      <div className="admin-navbar">
        <p onClick={() => {
          setShowSearch(true);
          setShowBooks(false);
          setShowMeetingForm(false);
          setShowMeetings(false);
        }}>Search</p>
        
        <p onClick={() => {
          setShowSearch(false);
          setShowBooks(true);
          setShowMeetingForm(false);
          setShowMeetings(false);
        }}>Books</p>
        
        <p onClick={() => {
          setShowSearch(false);
          setShowBooks(false);
          setShowMeetingForm(false);
          setShowMeetings(true);
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

        <div className="Admin-search-result">
          {validateIsbn(isbn) && <GetNewBook 
            isbn={isbn} 
            setShowAddForm={setShowAddForm}
            items={items}
            setItems={setItems}
            />}
          {(isbn && !validateIsbn(isbn)) && <div className="invalid">Invalid ISBN</div>}
        </div>      

        <div className="Admin-add-book">
          {items &&  
          <AddBook 
            showAddForm={showAddForm}
            showBookAdded={showBookAdded}
            setShowBookAdded={setShowBookAdded}
            setShowAddForm={setShowAddForm}
            isbn={isbn}
            items={items}
          />  
          }
        </div>  
      </div>}

      {showBooks &&
      <div className="Admin-booklist">
        <AdminBookList deleteBook={deleteBook} setDeleteBook={setDeleteBook}/>
      </div>}

      {showMeetings &&
      <div className="Admin-meetings">
        
        {
          <AdminMeetings 
            deleteMeeting={deleteMeeting} 
            setDeleteMeeting={setDeleteMeeting}
            setMeetingId={setMeetingId}
            setShowEditMeeting={setShowEditMeeting}
            setShowMeetings={setShowMeetings}
            setShowMeetingForm={setShowMeetingForm}
            />
        }    
      </div>}

      {showMeetingForm &&
      <div className="Admin-meeting-form-cont">
        <div id="Admin-meeting-form">
          {showEditMeeting ? <EditMeeting 
            id={meetingId} 
            setShowEditMeeting={setShowEditMeeting}
            setShowMeetings={setShowMeetings}
            setShowMeetingForm={setShowMeetingForm} /> : 
            <NewMeeting />
          }
        </div>
      </div>}
    </div>  
  )  
}  
    


  export default Admin;