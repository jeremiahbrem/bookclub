function deleteBookFromDb(isbn) {

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/db/api/books/${isbn}`, requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
          console.log(result.message);
        }  
    )
    .catch((error) => {
        console.log(error);
    })
    
}



 
module.exports = { deleteBookFromDb };