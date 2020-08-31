import React, { useState, useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import "./Schedule.css";

const { parseDate } = require("./utilities/parseDate.js");
const { trimDescription } = require("./utilities/trimDescription.js");
const Schedule = ({setSelectedMeeting, selectedMeeting}) => {
  
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
          // console.log(JSON.parse(result.meetings[0].description).blocks[0]);
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
      <div className="Schedule">
        <h3 className="Schedule-now">{getDateString()}</h3>
        <div className="Schedule-next">Next Meeting:</div>
        {items.map(meeting => {
          const trimmed = trimDescription(meeting.description);
          const editorState=EditorState.createWithContent(convertFromRaw(JSON.parse(trimmed)));
          return (
            <div className="Schedule-text" key={meeting.id}>
              <div className={`Schedule-date`}>
                <p>{parseDate(meeting.meet_date)[0]}<small>{parseDate(meeting.meet_date)[1]}</small></p>
              </div>
              <div className={`Schedule-description`}>
                <Editor 
                  wrapperClassName="Schedule-editor"
                  toolbarClassName="toolbar"
                  editorState={editorState} 
                  readOnly={true}
                  toolbarHidden
                />
              </div>
            </div>
          )
        })}
      </div>
    );
  }
  // console.log(JSON.parse(result.meetings[0].description).blocks[0].text.slice(0,100));
  // setEditorState(
  //   EditorState.createWithContent(convertFromRaw(JSON.parse(meeting.description)))
  //  );
  // <Editor 
  //                       editorState={editorState} 
  //                       readOnly={true}
  //                       toolbarHidden
  //                     />
}



  export default Schedule;