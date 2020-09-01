function userLogin({username, password, setMessage}) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    fetch(`/db/api/login/`, requestOptions)
        .then(response => {
            setMessage(response.json().token);
        })    
        .then(data => {
            return
        })
        .catch(e => console.log(e));  
}

module.exports = { userLogin };