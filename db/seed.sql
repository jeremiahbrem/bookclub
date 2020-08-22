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
    title TEXT NOT NULL,
    synopsis TEXT,
    read_date DATE,
    genre VARCHAR(30),
    author VARCHAR(50),
    publish_date DATE,
    info_url TEXT
);

CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    book_id INT REFERENCES books,
    description TEXT
);