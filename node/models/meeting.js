/** Book class for bookclub */

const db = require("../db");
const ExpressError = require("../helpers/expressError.js");
const sqlForPartialUpdate = require("../helpers/partialUpdate.js")

class Meeting {

  /* constructor for new meeting object with properties */
  constructor(id, date, book_id, description, link) {
    this.id = id;
    this.date = date;
    this.book_id = book_id;
    this.description = description;
    this.link = link;
  }

  /* returns single meeting as Meeting object 
   */
  static async getMeetings() {
    const result = await db.query(
      `SELECT m.id, m.book_id, m.description, m.link, b.isbn,
      TO_CHAR(
        date,
        'HH:MM AM MON DD, YYYY'
       ) meet_date
       FROM meetings AS m JOIN books AS b
       ON m.book_id = b.id
       ORDER BY meet_date`
    );
    return result.rows;
  }


  /* gets meeting by id and returns Meeting object */ 
  static async getMeeting(id) {
    const result = await db.query(
      `SELECT id, book_id, description, link,
        TO_CHAR(
          read_date,
          'MON YYYY'
        ) meet_date
        FROM meetings WHERE id='${id}'`
    );
  
    if (!result.rows[0]) {
      throw new ExpressError(`Meeting with id ${id} not found`, 404);
    }
    const { id, date, book_id, description, link } = result.rows[0];
    return new Meeting(id, date, book_id, description, link);
  }


  // adds new meeting to db and returns Meeting object
  static async add({date, book_id, description, link}) {  
    let query = `INSERT INTO meetings 
      (date, book_id, description, link)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    let values = [date, book_id, description, link];

    const result = await db.query(query, values);
    return new Meeting(result.rows[0]);
  }

  // Updates book instance with given properties and returns updated book
  async update(parameters) {
    
    const { query, values } = sqlForPartialUpdate('meetings', parameters, 'id', this.id);
    const result = await db.query(query, values);  
    return result.rows[0];
  }

  // Deletes meeting from database
  async delete() {
    const response = await db.query(
      `DELETE FROM meetings WHERE id=$1
       RETURNING id`,
       [this.id]
    );
    const message = `Meeting ${response.rows[0].id} deleted.`
    return message;
  }
}

module.exports = Meeting;