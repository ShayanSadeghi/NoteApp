const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find({ user: req.user.id }).then(profile => {
      return res.json(profile);
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newProfile = new Profile({
      user: req.user.id,
      fname: req.body.fname,
      lname: req.body.lname,
    });

    newProfile
      .save()
      .then(profile => res.json(profile))
      .catch(err => {
        console.log(err);
      });
  }
);

module.exports = router;
