const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Note Model
const Note = require("../../models/Note");

//Create new Note
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newNote = new Note({
      user: req.user.id,
      title: req.body.title,
      body: req.body.body,
    });

    newNote.save().then((note) => res.json(note));
  }
);

module.exports = router;
