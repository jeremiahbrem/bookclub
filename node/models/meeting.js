/** Book class for bookclub */

const db = require("../db");
const ExpressError = require("../helpers/expressError.js");
const sqlForPartialUpdate = require("../helpers/partialUpdate.js")

class Meeting {

  /* constructor for new meeting object with properties */
  constructor(id, date, description, link) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.link = link;
  }

  /* returns single meeting as Meeting object 
   */
  static async getMeetings() {
    const result = await db.query(
      `SELECT id, description, link,
      TO_CHAR(
        date,
        'HH:MI AM MM/DD YYYY'
       ) meet_date
       FROM meetings
       ORDER BY meet_date`
    );
    return result.rows;
  }


  /* gets meeting by id and returns Meeting object */ 
  static async getMeeting(meetingId) {
    const result = await db.query(
      `SELECT id, description, link,
      TO_CHAR(
        date,
        'HH24:MI YYYY-MM-DD'
       ) meet_date
        FROM meetings WHERE id='${meetingId}'`
    );
  
    if (!result.rows[0]) {
      throw new ExpressError(`Meeting with id ${meetingId} not found`, 404);
    }
    const { id, meet_date, description, link } = result.rows[0];
    return new Meeting(id, meet_date, description, link);
  }


  // adds new meeting to db and returns Meeting object
  static async add({date, description, link}) {  
    let query = `INSERT INTO meetings 
      (date, description, link)
      VALUES ($1, $2, $3) RETURNING *`;

    let values = [date, description, link];

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