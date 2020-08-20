import { COVER_BASE_URL } from "./config";

class Book {
  constructor({ISBN, info_url, title, covers, authors, publish_date}) {
      this.isbn = ISBN;
      this.info_url = info_url;
      this.title = title;
      this.covers = covers;
      this.authors = authors;
      this.publish_date = publish_date;
      this.synopsis = "";
      this.coverUrl = "";
  }

  getCover() {
    fetch(`${COVER_BASE_URL}/b/isbn/${this.isbn}-L.jpg`)
    .then(res => res.json())
    .then((data) => {
      this.coverUrl= data;
    })
    .catch(console.log)
    return this.coverUrl;
  }
}

export default Book;

// https://openlibrary.org/api/books?bibkeys=ISBN:9781982137977&format=json&jscmd=details