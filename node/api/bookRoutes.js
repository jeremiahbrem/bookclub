const express = require("express");
const router = new express.Router();
// const db = require("../db");
// const ExpressError = require("../helpers/expressError");
const Book = require("../models/book.js");
// const jsonschema = require("jsonschema");
// const newCompany = require("../schemas/newCompany.json");
// const updateCompany = require("../schemas/updateCompany.json");
// const { ensureLoggedIn, ensureIsAdmin } = require("../middleware/auth.js");

// returns list of companies, filtered if arguments added
// router.get("/", ensureLoggedIn, async function (req, res, next) {
router.get("/", async function (req, res, next) {
  try {
    const {title, author, read_date} = req.query
    const response = await Book.getBooks(title, author, read_date);
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
    // return res.json(
    //   { 
    //     book: {
    //       isbn: getBook.isbn,
    //       title: getBook.title,
    //       synopsis: getBook.synopsis,
    //       genre: getBook.genre,
    //       publish_date: getBook.publish_date,
    //       month_year: getBook.read_date,
    //       author: getBook.author,
    //       info_url: getBook.info_url
    //       }
    //   })    
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
//   try {
//     if (req.body.handle) {
//       throw new ExpressError("Updating handle not allowed", 401);
//     }
//     const result = jsonschema.validate(req.body, updateCompany);

//     if (!result.valid) {
//       let listOfErrors = result.errors.map(error => error.stack);
//       let error = new ExpressError(listOfErrors, 400);
//       return next(error);
//     }
//     const comp = await Book.getCompany(req.params.handle);
//     const company = await comp.update(req.body);
//     return res.json({company});
//   } catch(err) {
//     return next(err);
//   }
// })

// router.delete("/:handle", ensureIsAdmin, async function (req, res, next) {
//   try {
//     const company = await Company.getCompany(req.params.handle);
//     const message = await company.delete();
//     return res.json({message});
//   } catch(err) {
//     return next(err);
//   }
// })

module.exports = router;