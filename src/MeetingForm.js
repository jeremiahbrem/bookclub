import React from "react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MeetingForm = ({editorState, setEditorState, handleSubmit, handleChange, ...props}) => {
    return (
    <div className="MeetingForm-container">
        <form className="MeetingForm-form" onSubmit={handleSubmit}>
        <div className="MeetingForm-input-container">
            
            <label className="MeetingForm-label">Book Reading</label>
            <select>
                
            </select>
            <input className="MeetingForm-input" type="text" name="book_id" 
            value={props.book_id} onChange={handleChange} />
        
            <label className="MeetingForm-label">Date</label>
            <input className="MeetingForm-input" type="date" name="date" 
            value={props.date} onChange={handleChange} />
        
            <label className="MeetingForm-label">Time</label>
            <input className="MeetingForm-input" type="time" name="time" 
            value={props.time} onChange={handleChange} />
            
            <label className="MeetingForm-label">Meeting Link</label>
            <input className="MeetingForm-input" type="url" name="link" 
            value={props.link} onChange={handleChange} />
        </div>
        <div className="MeetingForm-editor-container">
            <label className="MeetingForm-label">Description</label>
            <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                onEditorStateChange={setEditorState}
                placeholder="Enter description"
            />
            <button className="MeetingForm-btn" type="submit">Submit</button>
        </div>        
        </form>
    </div>  
    );
}    

export default MeetingForm;

