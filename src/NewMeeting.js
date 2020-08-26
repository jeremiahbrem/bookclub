import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import MeetingForm from "./MeetingForm.js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./NewMeeting.css";
import "./MeetingForm.css";

const { addNewMeeting } = require("./utilities/addNewMeeting.js");

const NewMeeting = ({
    selectValue, 
    setSelectValue, 
    setShowMeetingAdded, 
    setShowBooks, 
    showMeetingAdded,
    setShowMeetingForm
  }) => {

  const [book_id, setBookId] = useState("");  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  
  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
    
    if (name === 'date')
      setDate(target.value);
    else if (name === 'time')
      setTime(target.value);
    else 
      setLink(target.value);  
    setBookId(selectValue);  
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    try {
      addNewMeeting({
        date: `${date} ${time}`,  
        book_id,  
        description: JSON.stringify(convertToRaw(editorState.getCurrentContent())), 
        link
      })
    } catch(error) {
        console.log(error);
    }
    setShowMeetingForm(false);
    setShowMeetingAdded(true);
    setTimeout(() => {
      setShowMeetingAdded(false);
      setShowBooks(true);
    }, 3000);
    setDate("");
    setTime("");
    setBookId("");
    setLink("");
    setEditorState("");
    setSelectValue("default");
  }

  return (
    <div>
      <h3 className="NewMeeting-head">Add New Meeting</h3>
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
      />
      {showMeetingAdded && <div className="meeting-added">Meeting added!</div>}  
    </div>
  );
}

  export default NewMeeting;