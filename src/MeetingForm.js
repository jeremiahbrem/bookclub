import React from "react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MeetingForm = ({editorState, setEditorState, handleSubmit, handleChange, ...props}) => {
    return (
    <div className="NewMeeting-container">
        <form className="NewMeeting-form" onSubmit={handleSubmit}>
        <div className="NewMeeting-input-container">
            <h3 className="NewMeeting-head">Add New Meeting</h3>
            <label className="NewMeeting-label">Book Reading</label>
            <input className="NewMeeting-input" type="text" name="isbn" 
            value={props.isbn} onChange={handleChange} />
        
            <label className="NewMeeting-label">Date</label>
            <input className="NewMeeting-input" type="date" name="date" 
            value={props.date} onChange={handleChange} />
        
            <label className="NewMeeting-label">Time</label>
            <input className="NewMeeting-input" type="time" name="time" 
            value={props.time} onChange={handleChange} />
            
            <label className="NewMeeting-label">Meeting Link</label>
            <input className="NewMeeting-input" type="url" name="url" 
            value={props.url} onChange={handleChange} />
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
            <button className="NewMeeting-btn" type="submit">Add Meeting</button>
        </div>        
        </form>
    </div>  
    );
}    

export default MeetingForm;

