function addNewBook({isbn, title, synopsis, genre, publish_date, info_url, read_date, author}) {
    // gathers year only from publish_date
    publish_date = +publish_date.slice(-4);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isbn, title, synopsis, genre, publish_date, info_url, read_date, author })
    };
    fetch('/db/api/books', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data.book))
        .catch(e => console.log(e));
}

module.exports = { addNewBook };