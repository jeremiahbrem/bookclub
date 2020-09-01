import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import MeetingForm from "./MeetingForm";
import "./EditMeeting.css";

const { updateMeeting } = require("./utilities/updateMeeting.js");
 
const EditMeeting = ({ 
    id, 
    setShowEditMeeting, 
    setShowMeetings, 
    setShowMeetingForm,
    selectValue,
    setSelectValue 
  }) => {

  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(null);
  const [book_id, setBookId] = useState("");  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
 
  useEffect(() => {
    let mounted = true;
    fetch(`/db/api/meetings/${id}`)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          const resp = result.meeting;
          setItem(resp);
          setBookId(resp.book_id);
          setDate(resp.date.slice(6))
          setTime(resp.date.slice(0,5));
          setLink(resp.link);
          setIsLoaded(true);
          setEditorState(
           EditorState.createWithContent(convertFromRaw(JSON.parse(resp.description)))
          );
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  },[id])

  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
  
    if (name === 'date')
      setDate(target.value);
    else if (name === 'time')
      setTime(target.value);
    else 
      setLink(target.value); 
    setBookId(selectValue)   
  }

  async function handleSubmit(event) {
    event.preventDefault();
    updateMeeting({
      id,
      date: `${date} ${time}`, 
      book_id,
      description: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      link: link
    })
    // console.log(response);
    setShowEditMeeting(false);
    setShowMeetings(true);
    setShowMeetingForm(false);
    setSelectValue("default");
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!item) {
    return (
      <div className="Meeting"></div>
    );
  } else {
    return (
      <div>
        <h3 className="EditMeeting-head">Edit Meeting</h3>
        <MeetingForm 
          editorState={editorState}
          setEditorState={setEditorState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          book_id={book_id}
          date={date}
          time={time}
          link={link}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          id={id}
      />
      <button className="EditMeeting-cancel" onClick={() => {
          setShowEditMeeting(false);
          setShowMeetings(true)
          setShowMeetingForm(false);
        }}>Cancel
      </button>
      </div>
    );  
  }
}

export default EditMeeting;