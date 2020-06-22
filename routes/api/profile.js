const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newProfile = new Note({
      user: req.user.id,
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      address: req.body.address,
      job: req.body.job,
      birthdate: req.body.birthdate,
      image: req.body.image,
    });

    newNote.save().then(note => res.json(note));
  }
);

module.exports = router;
