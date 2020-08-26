import React, { useState, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./UpcomingMeetings.css";
 
const UpcomingMeetings = ({ setSelectedMeeting }) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(null);
 

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/Meetings`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          for (let meeting of result.meetings) {
            if (Date.parse(meeting.meet_date) >= Date.parse(Date())) {
              setItem(meeting);
              break;
            }
          }
          setIsLoaded(true);
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  })

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!item) {
    return (
      <div className="UpcomingMeetings"></div>
    );
  } else {
    return (
      <div className="UpcomingMeetings">
        <h2>Upcoming Meeting</h2>
        <div className="UpcomingMeetings-cont">
            <div className="UpcomingMeetings-img">
            <img className="Schedule-slider-img" 
                src={`/b/isbn/${item.isbn}-S.jpg`} alt=""/>
            </div>
            <Link onClick={() => setSelectedMeeting(item.id)} to={`/schedule`}>
              <div className="UpcomingMeetings-details">
                <ul>
                  <li className="UpcomingMeetings-date">{item.meet_date[0] === '0' ? item.meet_date.slice(1) : 
                    item.meet_date}</li>
                </ul>
              </div>
            </Link> 
        </div>
      </div>
    );
  }
}



 
export default UpcomingMeetings;