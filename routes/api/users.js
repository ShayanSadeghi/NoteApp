const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).json({
      error: "All fields are required",
    });
  } else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.status(400).json({
          error: "User exists",
        });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) =>console.log(err));
      }
    })
    .catch(err=>res.status(400).json(err));
  }
});

module.exports = router;
