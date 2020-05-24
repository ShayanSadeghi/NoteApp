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

//Remove Note
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.params.id)
      .then((note) => {
        if (note.user.toString() !== req.user.id) {
          return res(401).json({ notAuthorized: "User not authorized" });
        }
        note.remove().then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json({ postNotFound: "No post found" }));
  }
);

module.exports = router;
