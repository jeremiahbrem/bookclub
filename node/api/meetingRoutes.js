const express = require("express");
const router = new express.Router();
// const db = require("../db");
// const ExpressError = require("../helpers/expressError");
const Meeting = require("../models/meeting.js");
// const jsonschema = require("jsonschema");
const { ensureIsAdmin } = require("../middleware/auth.js");

// returns list of meetings
router.get("/", async function (req, res, next) {
  try {
    const response = await Meeting.getMeetings();
    return res.json({meetings: response});
  }
  catch (err) {
    return next(err);
  }
});

// returns single meeting
router.get("/:id", async function (req, res, next) {
  try {
    const getMeeting = await Meeting.getMeeting(req.params.id);
       
    return res.json({meeting: getMeeting})
  } catch(err) {
    return next(err);
  }
})

// creates and returns new book
router.post("/", ensureIsAdmin, async function (req, res, next) {
  try {
    // const result = jsonschema.validate(req.body, newCompany);

    // if (!result.valid) {
    //   let listOfErrors = result.errors.map(error => error.stack);
    //   let error = new ExpressError(listOfErrors, 400);
    //   return next(error);
    // }  
    // delete req.body._token;
    const meeting = await Meeting.add(req.body);
    
    return res.status(201).json({meeting});
  } catch(err) {
    return next(err);
  }
})

// updates book and returns updated book
router.patch("/:id", ensureIsAdmin, async function (req, res, next) {
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
    const getMeeting = await Meeting.getMeeting(req.params.id);
    const meeting = await getMeeting.update(req.body);
    return res.json({meeting});
  } catch(err) {
    return next(err);
  }
})

router.delete("/:id", ensureIsAdmin, async function (req, res, next) {
  try {
    const meeting = await Meeting.getMeeting(req.params.id);
    const message = await meeting.delete();
    return res.json({message});
  } catch(err) {
    return next(err);
  }
})

module.exports = router;