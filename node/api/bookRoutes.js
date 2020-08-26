const express = require("express");
const router = new express.Router();
// const db = require("../db");
// const ExpressError = require("../helpers/expressError");
const Book = require("../models/book.js");
// const jsonschema = require("jsonschema");
// const { ensureLoggedIn, ensureIsAdmin } = require("../middleware/auth.js");

// returns list of books, filtered if arguments added
// router.get("/", ensureLoggedIn, async function (req, res, next) {
router.get("/", async function (req, res, next) {
  try {
    const {title, author, read_date, sort} = req.query
    const response = await Book.getBooks({title, author, read_date, sort});
    
    return res.json({books: response});
  }
  catch (err) {
    return next(err);
  }
});

// returns single book
router.get("/:isbn", async function (req, res, next) {
  try {
    const getBook = await Book.getBook(req.params.isbn);
    
    return res.json({book: getBook})
  } catch(err) {
    return next(err);
  }
})

// creates and returns new book
// router.post("/", ensureIsAdmin, async function (req, res, next) {
router.post("/", async function (req, res, next) {
  try {
    // const result = jsonschema.validate(req.body, newCompany);

    // if (!result.valid) {
    //   let listOfErrors = result.errors.map(error => error.stack);
    //   let error = new ExpressError(listOfErrors, 400);
    //   return next(error);
    // }  
    // delete req.body._token;
    const book = await Book.add(req.body);
    
    return res.status(201).json({book});
  } catch(err) {
    return next(err);
  }
})

// updates book and returns updated book
// router.patch("/:handle", ensureIsAdmin, async function (req, res, next) {
router.patch("/:isbn", async function (req, res, next) {
  try {
    // if (req.body.handle) {
    //   throw new ExpressError("Updating handle not allowed", 401);
    // }
    // const result = jsonschema.validate(req.body, updateCompany);

    // if (!result.valid) {
    //   let listOfErrors = result.errors.map(error => error.stack);
    //   let error = new ExpressError(listOfErrors, 400);
    //   return next(error);
    // }
    const getBook = await Book.getBook(req.params.isbn);
    const book = await getBook.update(req.body);
    return res.json({book});
  } catch(err) {
    return next(err);
  }
})

router.delete("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.getBook(req.params.isbn);
    const message = await book.delete();
    return res.json({message});
  } catch(err) {
    return next(err);
  }
})

module.exports = router;