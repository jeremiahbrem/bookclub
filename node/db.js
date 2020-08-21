/** Database setup for jobly. */

const pg = require("pg");
const { DB_URI, USER, PASSWORD, HOST } = require("./config");

const db = new pg.Client({
  user: USER,
  password: PASSWORD,
  host: HOST,
  database: DB_URI,
  port: 5432
});

db.connect();

module.exports = db;
