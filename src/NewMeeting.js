import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./NewMeeting.css";

const NewMeeting = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
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
      setUrl(target.value);  
    console.log(JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent()))))
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    // addNewBook({
    //   isbn, 
    //   title: items.details.title, 
    //   synopsis, 
    //   genre, 
    //   publish_date: items.details.publish_date,
    //   info_url: items.info_url, 
    //   read_date, 
    //   author
    // });
    // setShowBookAdded(true);
    // setShowAddForm(false);
    // setSynopsis("");
    // setGenre("");
    // setReadDate("");
    // setAuthor("");
  }

  return (
    <div className="NewMeeting-container">
      <form className="NewMeeting-form" onSubmit={handleSubmit}>
        <div className="NewMeeting-input-container">
          <h3 className="NewMeeting-head">Add New Meeting</h3>
          <label className="NewMeeting-label">Book Reading</label>
          <input className="NewMeeting-input" type="text" name="book" 
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