/** Book class for bookclub */

const db = require("../db");
const ExpressError = require("../helpers/expressError.js");
// const sqlForPartialUpdate = require("../helpers/partialUpdate.js")

class Book {

  /* stores isbn and user edited book properties;
     can retrieve full book details from api */
  constructor(isbn, title, synopsis, genre, publish_date, info_url, read_date, author) {
    this.isbn = isbn;
    this.title = title;
    this.synopsis = synopsis;
    this.genre = genre;
    this.publish_date = publish_date;
    this.info_url = info_url;
    this.read_date = read_date;
    this.author = author;
  }

  /* 
   */
  static async getBooks(title, author, read_date, order="ASC", sort="read_date") {
    let searchQuery = '';
    let queryStart = 'WHERE';

    if (title) {
      searchQuery = `${queryStart} title LIKE '%${title}%'`;
      queryStart = 'AND';
    }

    if (author) {
      searchQuery += `${queryStart} author LIKE '%${author}%'`;
      queryStart = 'AND';
    }
    
    if (read_date) {
      read_date = `${read_date.year}-${read_date.month}-01`;
      searchQuery += `${queryStart} read_date LIKE '%${read_date}%'`;
    }

    const result = await db.query(
      `SELECT isbn, synopsis, genre, 
       TO_CHAR(
        read_date,
        'MON YYYY'
       ) month_year, 
       author FROM books ${searchQuery}
       ORDER BY ${sort} ${order}`
    );
    return result.rows;
  }


  /* gets book by isbn and returns Book object */ 
  static async getBook(isbnVal) {
    const result = await db.query(
      `SELECT isbn, title, synopsis, genre, publish_date, info_url, 
        TO_CHAR(
          read_date,
          'MON YYYY'
        ) month_year, author
        FROM books WHERE isbn='${isbnVal}'`
    );
  
    if (!result.rows[0]) {
      throw new ExpressError(`Book with isbn ${isbnVal} not found`, 404);
    }
    const { isbn, title, synopsis, genre, publish_date, info_url, month_year, author } = result.rows[0];
    return new Book(isbn, title, synopsis, genre, publish_date, info_url, month_year, author);
  }


  // adds new book to db and returns Book object
  static async add({isbn, title, synopsis, genre, publish_date, info_url, read_date, author}) {
    // check for duplicate isbn
    const isbnCheck = await db.query(
      `SELECT isbn FROM books WHERE isbn='${isbn}'`
    );
    if (isbnCheck.rows[0]) {
      throw new ExpressError(`ISBN ${isbn} already exists.`, 400);
    }
  
    let query = `INSERT INTO books 
      (isbn, title, synopsis, genre, publish_date, info_url, read_date, author)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    let values = [isbn, title, synopsis, genre, publish_date, info_url, read_date, author];

    const result = await db.query(query, values);
    return new Book(result.rows[0]);
  }

  // Updates book instance with given properties and returns updated book
  // async update(parameters) {
  //   // check for duplicate name
  //   const nameCheck = await db.query(
  //     `SELECT name FROM companies WHERE name='${parameters.name}'
  //      AND handle != '${this.handle}'`
  //   );
  //   if (nameCheck.rows[0]) {
  //     throw new ExpressError(`Name ${parameters.name} already exists.`, 400);
  //   }
  //   const { query, values } = sqlForPartialUpdate('companies', parameters, 'handle', this.handle);
  //   const result = await db.query(query, values);  
  //   return result.rows[0];
  // }

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