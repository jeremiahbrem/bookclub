import React, { useState, useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import { HashLink as Link } from 'react-router-hash-link';
import "./UpcomingMeetings.css";

const { parseDate } = require("./utilities/parseDate.js");
 
const UpcomingMeetings = ({ setSelectedMeeting }) => {
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
          for (let meeting of result.meetings) {
            if (Date.parse(meeting.meet_date) >= Date.parse(Date())) {
              setItem(meeting);
              setEditorState(
                EditorState.createWithContent(convertFromRaw(JSON.parse(meeting.description)))
               );
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
      <div className="UpcomingMeetings">
        <div className="UpcomingMeetings-text">
          <div className="UpcomingMeetings-next">Next Meeting</div>
          {item &&
          <div className="UpcomingMeetings-date">
            <p>{parseDate(item.meet_date)[0]}<small>{parseDate(item.meet_date)[1]}</small></p>
          </div>}
          {item &&
          <div className="UpcomingMeetings-description">
            <Editor 
              wrapperClassName="UpcomingMeetings-editor"
              toolbarClassName="toolbar"
              editorState={editorState} 
              readOnly={true}
              toolbarHidden
            />
          </div>}

          <button className="UpcomingMeetings-button"><p>View schedule</p></button>
        </div>
        <div className="UpcomingMeetings-img"></div>
      </div>
    );
  }
}



 
export default UpcomingMeetings;