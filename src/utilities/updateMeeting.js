function updateMeeting({id, date, description, link}) {
    const _token = localStorage.getItem('token');
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, description, link, _token })
    };
    fetch(`/db/api/meetings/${id}`, requestOptions)
        .then(response => {
            return response.json();
        })    
        .then(data => {
            return
        })
        .catch(e => console.log(e));
}

module.exports = { updateMeeting };