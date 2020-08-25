function addNewMeeting({date, book_id, description, link}) {
    // gathers year only from publish_date

    let id;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, book_id, description, link })
    };
    fetch('/db/api/meetings', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.meeting);
            id = data.meeting.id;
          } 
        )  
        .catch(e => console.log(e));   
        
        return id;
}

module.exports = { addNewMeeting };