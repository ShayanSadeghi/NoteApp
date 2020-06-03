const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Note Model
const Note = require("../../models/Note");

//Get user Notes
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.find({ user: req.user.id })
      .then(notes => {
        return res.json(notes);
      })
      .catch(err => res.status(404).json(err));
  }
);

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

    newNote.save().then(note => res.json(note));
  }
);

//Update note
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note.user.toString() !== req.user.id) {
          return res(401).json({ notAuthorized: "User not authorized" });
        }
        Note.updateOne(
          { _id: req.params.id },
          {
            title: req.body.title,
            body: req.body.body,
          }
        ).then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postNotFound: "No post found" }));
  }
);

//Remove Note
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note.user.toString() !== req.user.id) {
          return res(401).json({ notAuthorized: "User not authorized" });
        }
        note.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postNotFound: "No post found" }));
  }
);

module.exports = router;
