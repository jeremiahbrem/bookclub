function addNewMeeting({date, book_id, description, link}) {
    // gathers year only from publish_date

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, book_id, description, link })
    };
    fetch('/db/api/meetings', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data.meeting))
        .catch(e => console.log(e));
}

module.exports = { addNewMeeting };