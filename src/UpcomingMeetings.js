import React, { useState, useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import { HashLink as Link } from 'react-router-hash-link';
import "./UpcomingMeetings.css";

const { parseDate } = require("./utilities/parseDate.js");
 
const UpcomingMeetings = ({ setSelectedMeeting, night }) => {
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(null);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/Meetings`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          let meetings = result.meetings;
          // meetings are returned from api in descending order, so loop through
          // and find first meeting dated before today, then set next meeting to previous array item 
          for (let i = 0; i < meetings.length; i++) {
            if (Date.parse(meetings[i].meet_date) < Date.parse(Date())) {
              setItem(meetings[i-1]);
              setEditorState(
                EditorState.createWithContent(convertFromRaw(JSON.parse(meetings[i-1].description))))
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={`UpcomingMeetings ${night && 'UpcomingMeetings-night'}`}>
        <div className="UpcomingMeetings-text">
          <div className="UpcomingMeetings-next">Next Meeting:</div>
          {item &&
          <div className={`UpcomingMeetings-date ${night && 'UpcomingMeetings-date-night'}`}>
            <p>{parseDate(item.meet_date)[0]}<small>{parseDate(item.meet_date)[1]}</small></p>
          </div>}
          {item &&
          <div className={`UpcomingMeetings-description ${night && 'UpcomingMeetings-description-night'}`}>
            <Editor 
              wrapperClassName="UpcomingMeetings-wrapper"
              toolbarClassName="toolbar"
              editorClassName={`UpcomingMeetings-editor ${night && 'UpcomingMeetings-description-night'}`}
              editorState={editorState} 
              readOnly={true}
              toolbarHidden
            />
          </div>}

          <button className="UpcomingMeetings-button"><Link to="/schedule">View schedule</Link></button>
        </div>
        <div className="UpcomingMeetings-img"></div>
      </div>
    );
  }
}



 
export default UpcomingMeetings;