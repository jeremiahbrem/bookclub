import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import MeetingForm from "./MeetingForm.js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./NewMeeting.css";
import "./MeetingForm.css";

const { addNewMeeting } = require("./utilities/addNewMeeting.js");

const NewMeeting = ({meetings, setMeetings}) => {
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
    if (name === 'book_id')
      setBookId(target.value)
    else if (name === 'date')
      setDate(target.value);
    else if (name === 'time')
      setTime(target.value);
    else 
      setLink(target.value);  
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let id;
    try {
      id = addNewMeeting({
        date: `${date} ${time}`,  
        book_id,  
        description: JSON.stringify(convertToRaw(editorState.getCurrentContent())), 
        link
      })
    } catch(error) {
        console.log(error);
    }
    setDate("");
    setTime("");
    setBookId("");
    setLink("");
    setEditorState("");
    setMeetings(meetings.push(id))
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
      />  
    </div>
  );
}

  export default NewMeeting;