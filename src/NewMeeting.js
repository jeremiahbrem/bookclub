import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import MeetingForm from "./MeetingForm.js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./NewMeeting.css";

const { addNewMeeting } = require("./utilities/addNewMeeting.js");

const NewMeeting = () => {
  const [isbn, setIsbn] = useState("");  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  
  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
    if (name === 'isbn')
      setIsbn(target.value)
    else if (name === 'date')
      setDate(target.value);
    else if (name === 'time')
      setTime(target.value);
    else 
      setUrl(target.value);  
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    try {
      addNewMeeting({
        date: `${date} ${time}`,  
        isbn,  
        description: JSON.stringify(convertToRaw(editorState.getCurrentContent())), 
        url
      })
    } catch(error) {
        console.log(error);
    }
    setDate("");
    setTime("");
    setIsbn("");
    setUrl("");
    setEditorState("");
  }

  return (
    <div>
      <MeetingForm 
        editorState={editorState}
        setEditorState={setEditorState}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isbn={isbn}
        date={date}
        time={time}
        url={url}
      />  
    </div>
  );
}

  export default NewMeeting;