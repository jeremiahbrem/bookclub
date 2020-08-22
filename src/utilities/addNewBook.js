function addNewBook({isbn, genre, synopsis, read_date, author}) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isbn, genre, synopsis, read_date, author })
    };
    fetch('/db/api/books', requestOptions)
        .then(response => response.json())
        .then(data => console.log("hi"))
        .catch(e => console.log(e));
}

module.exports = { addNewBook };