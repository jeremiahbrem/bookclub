require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 12;

const USER = 'postgres';
const PASSWORD = 'postgres';
const HOST = 'localhost';

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "bookclub-test";
} else {
  DB_URI = process.env.DATABASE_URL || "bookclub";
}

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  BCRYPT_WORK_FACTOR,
  USER,
  PASSWORD,
  HOST
};
