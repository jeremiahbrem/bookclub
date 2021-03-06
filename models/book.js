/** Book class for bookclub */

const db = require("../db");
const ExpressError = require("../helpers/expressError.js");
const sqlForPartialUpdate = require("../helpers/partialUpdate.js")

class Book {

  /* constructor for new Book object with properties */
  constructor(id, isbn, title, synopsis, genre, publish_date, info_url, read_date, author, price) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.synopsis = synopsis;
    this.genre = genre;
    this.publish_date = publish_date;
    this.info_url = info_url;
    this.read_date = read_date;
    this.author = author;
    this.price = price;
  }

  /* retreives all books from database or a filtered list with given properties
   */
  static async getBooks({title, author, read_date, order="ASC", sort}) {
    let searchQuery = '';
    let queryStart = 'WHERE';
    if (!sort)
      sort = "read_date"

    if (title) {
      searchQuery = `${queryStart} title LIKE '%${title}%'`;
      queryStart = 'AND';
    }

    if (author) {
      searchQuery += `${queryStart} author LIKE '%${author}%'`;
      queryStart = 'AND';
    }
    
    if (read_date) {
      searchQuery += `${queryStart} read_date LIKE '%${read_date}%'`;
  
    }

    const result = await db.query(
      `SELECT id, isbn, title, read_date, synopsis, genre, publish_date, info_url,
       price, author FROM books ${searchQuery}
       ORDER BY ${sort} ${order}`
    );
    return result.rows;
  }


  /* gets single book by isbn and returns Book object */ 
  static async getBook(isbnVal) {
    const result = await db.query(
      `SELECT id, isbn, title, synopsis, genre, publish_date, info_url, 
       read_date, author, price
        FROM books WHERE isbn='${isbnVal}'`
    );
  
    if (!result.rows[0]) {
      throw new ExpressError(`Book with isbn ${isbnVal} not found`, 404);
    }
    const { id, isbn, title, synopsis, genre, publish_date, info_url, read_date, author, price } = result.rows[0];
    return new Book(id, isbn, title, synopsis, genre, publish_date, info_url, read_date, author, price);
  }


  // adds new book to db and returns Book object
  static async add({isbn, title, synopsis, genre, publish_date, info_url, read_date, author, price}) {
    // check for duplicate isbn
    const isbnCheck = await db.query(
      `SELECT isbn FROM books WHERE isbn='${isbn}'`
    );
    if (isbnCheck.rows[0]) {
      throw new ExpressError(`ISBN ${isbn} already exists.`, 400);
    }
  
    let query = `INSERT INTO books 
      (isbn, title, synopsis, genre, publish_date, info_url, read_date, author, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    let values = [isbn, title, synopsis, genre, publish_date, info_url, read_date, author, price];

    const result = await db.query(query, values);
    return new Book(result.rows[0]);
  }

  // Updates book instance with given properties and returns updated book
  async update(parameters) {
    // check for duplicate isbn
    const isbnCheck = await db.query(
      `SELECT isbn FROM books WHERE isbn='${parameters.isbn}'
       AND id != '${this.id}'`
    );
    if (isbnCheck.rows[0]) {
      throw new ExpressError(`ISBN ${parameters.isbn} already exists.`, 400);
    }
    const { query, values } = sqlForPartialUpdate('books', parameters, 'id', this.id);
    const result = await db.query(query, values);  
    return result.rows[0];
  }

  // Deletes book from database
  async delete() {
    const response = await db.query(
      `DELETE FROM books WHERE isbn=$1
       RETURNING isbn`,
       [this.isbn]
    );
    const message = `Book ${response.rows[0].isbn} deleted.`
    return message;
  }
}

module.exports = Book;