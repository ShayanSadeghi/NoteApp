const path = require("path");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

const Profile = require("../../models/Profile");

//Mongo
const mongoURI = "mongodb://localhost:27017/NoteApp";
const conn = mongoose.createConnection(mongoURI, () => {
  console.log("MongoDB Connected");
});

//Init gfs
let gfs;

conn.once("open", () => {
  //Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("inputFile"),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          profile.image = req.file.id;
          profile.save();
        } else {
          const newProfile = new Profile({
            user: req.user.id,
            image: req.file.id,
          });
          newProfile
            .save()
            .then(profile => console.log(profile))
            .catch(err => console.log(err));
        }
      })
      .catch(error => {
        res.json(error);
      });
    res.json({ file: req.file });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("inputFile"),
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
      phone: req.body.phone,
      address: req.body.address,
      job: req.body.job,
      birthdate: req.body.birthdate,
    });

    newProfile
      .save()
      .then(profile => {
        res.json(profile);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          profile.fname = req.body.fname;
          profile.lname = req.body.lname;
          profile.phone = req.body.phone;
          profile.address = req.body.address;
          profile.job = req.body.job;
          profile.birthdate = req.body.birthdate;
          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        } else {
          res.json({ error: "Profile not found" });
        }
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
