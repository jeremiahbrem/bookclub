function updateMeeting({id, date, book_id, description, link}) {

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, book_id, description, link })
    };
    fetch(`/db/api/meetings/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data.meeting))
        .catch(e => console.log(e));
}

module.exports = { updateMeeting };