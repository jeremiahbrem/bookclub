DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS meetings;
DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(30) NOT NULL UNIQUE,
    synopsis TEXT,
    read_date VARCHAR(30),
    genre VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    book_id INT REFERENCES books,
    description TEXT
);