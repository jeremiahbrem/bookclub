import React, { useState, useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import Contact from "./Contact";
import "./Schedule.css";

const { parseDate } = require("./utilities/parseDate.js");
const { trimDescription } = require("./utilities/trimDescription.js");
const Schedule = ({night}) => {
  
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/meetings`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setIsLoaded(true);
          let nextDate;
          let meetings = result.meetings;
          // meetings are returned from api in descending order, so loop through
          // and find first meeting dated before today, then set next meeting to previous array item
          for (let i = 0; i < meetings.length; i++) {
            if (Date.parse(meetings[i].meet_date) < Date.parse(Date())) {
              nextDate = Date.parse(meetings[i-1].meet_date);
              break;
            }
          }
          // include only next meeting and all previous
          meetings = meetings.filter(meeting => (
            Date.parse(meeting.meet_date) <= nextDate));
          setItems(meetings);  
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  }, [])

  // displays current month and year
  function getDateString() {
    let date = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!items) {
    return (
      <div className="Schedule"></div>
    );
  } else {
    return (
      <div>
        <div className={`Schedule ${night && 'Schedule-night'}`}>
          <h3 className={`Schedule-now ${night && 'Schedule-text-night'}`}>{getDateString()}</h3>
          {items.map(meeting => {
            // make trimmed version of description
            const trimmed = trimDescription(meeting.description);
            // show full description if selected, trimmed if unselected
            let editorState = (selected === meeting.id) ? 
              // retrieves and parses rich text data from database
              EditorState.createWithContent(convertFromRaw(JSON.parse(meeting.description))) :
              EditorState.createWithContent(convertFromRaw(JSON.parse(trimmed)));
            return (
              <div onClick={() => setSelected(selected === meeting.id ? null : meeting.id)} 
                // smooth transition if container clicked
                className={`Schedule-text ${selected === meeting.id && 'Schedule-text-selected'}
                  ${night && selected === meeting.id && 'Schedule-selected-night'}`} 
                key={meeting.id}>
                {/* label next meeting, which is first array item */}
                {meeting.id === items[0].id &&  
                <div className="Schedule-next">Next Meeting:</div>}
                {/* label previous above all others */}
                {meeting.id === items[1].id &&
                <div className="Schedule-next">Previous:</div>}
                <div className={`Schedule-date ${night && 'Schedule-text-night'}`}>
                  {/* show user friendly time and date */}
                  <p>{parseDate(meeting.meet_date)[0]}<small>{parseDate(meeting.meet_date)[1]}</small></p>
                </div>
                <div className={`Schedule-description ${night && 'Schedule-text-night'}`}>
                  {/* rich text description, read-only */}
                  <Editor 
                    wrapperClassName={`Schedule-editor ${night && 'Schedule-text-night'}`}
                    toolbarClassName="toolbar"
                    editorClassName={`Schedule-editor ${night && 'Schedule-text-night'}`}
                    editorState={editorState} 
                    readOnly={true}
                    toolbarHidden
                  />
                  <div className={`Schedule-link-cont`}>
                    {/* smooth transition if container clicked */}
                    <a className={`Schedule-link ${selected === meeting.id && 'Schedule-link-selected'}`} 
                      href={'mailto:user@example.com'}>Contact
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Contact/>
      </div>
      
    );
  }
}



  export default Schedule;