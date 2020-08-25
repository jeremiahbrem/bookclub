import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
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
    <div className="NewMeeting-container">
      <form className="NewMeeting-form" onSubmit={handleSubmit}>
        <div className="NewMeeting-input-container">
          <h3 className="NewMeeting-head">Add New Meeting</h3>
          <label className="NewMeeting-label">Book Reading</label>
          <input className="NewMeeting-input" type="text" name="isbn" 
            onChange={handleChange} />
        
          <label className="NewMeeting-label">Date</label>
          <input className="NewMeeting-input" type="date" name="date" 
            value={date} onChange={handleChange} />
        
          <label className="NewMeeting-label">Time</label>
          <input className="NewMeeting-input" type="time" name="time" 
            value={time} onChange={handleChange} />
          
          <label className="NewMeeting-label">Meeting Link</label>
          <input className="NewMeeting-input" type="url" name="url" 
            value={url} onChange={handleChange} />
        </div>
        <div className="NewMeeting-editor-container">
          <label className="NewMeeting-label">Description</label>
          <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Enter description"
          />
          <button className="NewMeeting-btn" type="submit">Add Book</button>
        </div>        
      </form>
    </div>  
  );
}

  export default NewMeeting;