import React, { useState, useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import "./Schedule.css";

const Schedule = ({setSelectedMeeting, selectedMeeting}) => {
  
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState(null);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

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
  }, [])

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
        <h3 className="Schedule-head">Meetings</h3>
        {items.map(meeting => {
          return (  
            <div key={meeting.id} id={meeting.id} onClick={() => {
              setSelectedMeeting(null);
              setSelected(selected === meeting.id ? null : meeting.id);
              setEditorState(
                EditorState.createWithContent(convertFromRaw(JSON.parse(meeting.description)))
               );
            }} className="Schedule-meeting">   
              <div className="Schedule-img">
                <img
                  className="Schedule-slider-img" 
                  src={`/b/isbn/${meeting.isbn}-S.jpg`} alt=""/>
              </div>
              <div className="Schedule-details">
                <ul>
                  <li className="Schedule-date">{meeting.meet_date[0] === '0' ? meeting.meet_date.slice(1) : 
                        meeting.meet_date}</li>
                  <li className="Schedule-link">Link: <a href={meeting.link}>{meeting.link}</a></li>
                </ul>
                {(selectedMeeting === meeting.id || selected === meeting.id) &&
                <div className="Schedule-description">
                      <Editor 
                        editorState={editorState} 
                        readOnly={true}
                        toolbarHidden
                      />
                </div>}
              </div>
            </div>
          )
         })}
      </div>
    );
  }
}

  export default Schedule;