import React, { useState, useEffect } from "react";

function DeleteMeeting({id}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let mounted = true;
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/db/api/meetings/${id}`, requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if (mounted) {
          setIsLoaded(true);
          setMessage(result.message);
        }  
      })
    .catch((error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
    return () => mounted = false;
  },[id, setIsLoaded, setError])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>{message}</div>;
  } else {
    return (
      <div></div>
    );
  }
}



 
export default DeleteMeeting;