function updateBook({isbn, title, synopsis, genre, publish_date, info_url, read_date, author}) {

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isbn, title, synopsis, genre, publish_date, info_url, read_date, author })
    };
    fetch(`/db/api/books/${isbn}`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data.book))
        .catch(e => console.log(e));
}

module.exports = { updateBook };