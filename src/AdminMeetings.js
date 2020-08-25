import React, { useState, useEffect } from "react";
import DeleteMeeting from "./DeleteBook";
import "./AdminMeetings.css";
 
const AdminMeetings = ({deleteMeeting, setDeleteMeeting}) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/meetings`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setItems(result.meetings);
          setIsLoaded(true);
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  }, [setItems, setIsLoaded, setDbError])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!items) {
    return (
      <div className="AdminMeetings"></div>
    );
  } else {
    return (
      <div className="AdminMeetings">
        <h3 className="AdminMeetings-head">Edit Meetings</h3>
        {items.map(meeting => {
          if (deleteMeeting === meeting.id) {
            return <div><DeleteMeeting id={meeting.id}/></div>
          }
          return (  
            <div key={meeting.id}className="AdminMeetings-book">    
              <div className="AdminMeetings-book-img">
                <img className="AdminMeetings-slider-img" src={`/b/isbn/${meeting.isbn}-M.jpg`} alt=""/>
              </div>
              <div className="AdminMeetings-read">
                <ul>
                  <li>{meeting.meet_date}</li>
                </ul>
              </div>
              <div>
                <button className="AdminMeetings-edit-btn">Edit</button>
                <button onClick={() => setDeleteMeeting(meeting.id)} className="Admin-delete-btn">Delete</button>
              </div>
            </div> 
          )
         })}
      </div>
    );
  }
}



 
export default AdminMeetings;