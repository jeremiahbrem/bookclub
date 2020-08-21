/** Book class for bookclub */

const db = require("../db");
const ExpressError = require("../helpers/expressError.js");
// const sqlForPartialUpdate = require("../helpers/partialUpdate.js")

class Book {

  /* stores isbn and user edited book properties;
     can retrieve full book details from api */
  constructor(isbn, synopsis, genre, read_date) {
    this.isbn = isbn;
    this.synopsis = synopsis;
    this.genre = genre;
    this.read_date = read_date;
  }

  /* 
   */
  static async getBooks(title, author, read_date) {
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
      searchQuery += `${queryStart} read_date LIKE '%${read_date}%'`;
      queryStart = 'AND'
    }

    const result = await db.query(
      `SELECT isbn, synopsis, genre, read_date FROM books ${searchQuery}`
    );
    return result.rows;
  }


  /* gets company by handle and returns Company object */ 
  // static async getCompany(handleInput) {
  //   const result = await db.query(
  //     `SELECT handle, name, description, num_employees, logo_url
  //       FROM companies WHERE handle='${handleInput}'`
  //   );
  
  //   if (!result.rows[0]) {
  //     throw new ExpressError(`Company with handle ${handleInput} not found`, 404);
  //   }
  //   const { handle, name, description, num_employees, logo_url } = result.rows[0];
  //   return new Company(handle, name, description, num_employees, logo_url);
  // }

  /* Creates new company with given properties and returns Company object
     Accepts parameter object that may have 2 or more inputs given from route
   * index - incremental value placeholder in query statements
   * query - db.query statement string
   * columns - array for storing columns to be changed in SET statement
   * indexes - array for storing value placeholders for query statement
   * values - array of given updated property values
  */ 
  static async add({isbn, synopsis=null, genre=null, read_date=null}) {
    // check for duplicate isbn
    const isbnCheck = await db.query(
      `SELECT isbn FROM books WHERE isbn='${isbn}'`
    );
    if (isbnCheck.rows[0]) {
      throw new ExpressError(`ISBN ${isbn} already exists.`, 400);
    }
  
    let query = `INSERT INTO books 
      (isbn, synopsis, genre, read_date)
      VALUES ($1, $2, $3, $4) RETURNING *`;

    let values = [isbn, synopsis, genre, read_date];

    const result = await db.query(query, values);
    return new Book(result.rows[0]);
  }
}
  // // Updates company instance with given properties and returns updated company
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

  // Deletes company from database
//   async delete() {
//     const response = await db.query(
//       `DELETE FROM companies WHERE handle=$1
//        RETURNING name`,
//        [this.handle]
//     );
//     const message = `Company ${response.rows[0].name} deleted.`
//     return message;
//   }

//   // returns job titles associated with the company object
//   async getJobs() {
//     const response = await db.query(
//       `SELECT title FROM jobs WHERE company_handle='${this.handle}'`
//     )
//     return response.rows;
//   }
// }

module.exports = Book;