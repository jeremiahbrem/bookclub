import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import MeetingForm from "./MeetingForm";
import "./EditMeeting.css";
 
const EditMeeting = ({ match }) => {
    const {
      params: { id }
    } = match;
  const [error, setDbError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(null);
  const [isbn, setIsbn] = useState("");  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
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
          setItem(result.meeting);
          const richText = convertFromRaw(JSON.parse(item.description));
          setEditorState(richText);
          setIsbn(item.isbn);
          setDate(item.date.slice(9))
          setTime(item.slice(0,9));
          setUrl(item.link);
          setIsLoaded(true);
        }
      })
    .catch((error) => {
        setDbError(error);
        setIsLoaded(true);
      }
    )
    return () => mounted = false;
  })

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
    addNewBook({
      isbn, 
      title: items.details.title, 
      synopsis, 
      genre, 
      publish_date: items.details.publish_date,
      info_url: items.info_url, 
      read_date, 
      author
    });
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
        <MeetingForm 
          editorState={editorState}
          setEditorState={setEditorState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isbn={isbn}
          date={item.date.slice(9)}
          time={item.date.slice(0,9)}
          url={item.link}
      />
      
      </div>
    );  
  }
}

export default EditMeeting;