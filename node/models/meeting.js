/** Book class for bookclub */

const db = require("../db");
const ExpressError = require("../helpers/expressError.js");
// const sqlForPartialUpdate = require("../helpers/partialUpdate.js")

class Meeting {

  /* stores isbn and user edited book properties;
     can retrieve full book details from api */
  constructor(date, isbn, description, link) {
    this.date = date;
    this.isbn = isbn;
    this.description = description;
  }

  /* 
   */
  static async getMeetings() {
    const result = await db.query(
      `SELECT isbn, description, link
       TO_CHAR(
        date,
        'HH:MM Mon DD, YYYY'
       ) meet_date
       FROM meetings ORDER BY meet_date`
    );
    return result.rows;
  }


  /* gets book by isbn and returns Book object */ 
//   static async getBook(isbnVal) {
//     const result = await db.query(
//       `SELECT isbn, title, synopsis, genre, publish_date, info_url, 
//         TO_CHAR(
//           read_date,
//           'MON YYYY'
//         ) month_year, author
//         FROM books WHERE isbn='${isbnVal}'`
//     );
  
//     if (!result.rows[0]) {
//       throw new ExpressError(`Book with isbn ${isbnVal} not found`, 404);
//     }
//     const { isbn, title, synopsis, genre, publish_date, info_url, month_year, author } = result.rows[0];
//     return new Book(isbn, title, synopsis, genre, publish_date, info_url, month_year, author);
//   }


  // adds new book to db and returns Book object
  static async add(date, isbn, description, link) {  
    let query = `INSERT INTO meetings 
      (date, isbn, description, link)
      VALUES ($1, $2, $3, $4) RETURNING *`;

    let values = [date, isbn, description, link];

    const result = await db.query(query, values);
    return new Meeting(result.rows[0]);
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
//   async delete() {
//     const response = await db.query(
//       `DELETE FROM books WHERE isbn=$1
//        RETURNING isbn`,
//        [this.isbn]
//     );
//     const message = `Book ${response.rows[0].isbn} deleted.`
//     return message;
//   }
}

module.exports = Meeting;