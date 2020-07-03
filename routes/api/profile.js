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

//Upload File
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

// get user profile image
router.get(
  "/image/:fileId",
  (req, res) => {
    gfs.files.findOne(
      { _id: mongoose.Types.ObjectId(req.params.fileId) },
      { lean: true },
      (err, file) => {
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exist",
          });
        }
        // Check file type
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          //Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: "Not an image",
          });
        }
      }
    );
  }
);

// delete user profile image
router.delete(
  "/files/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err });
      }
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          profile.image = null;
          profile.save();
        })
        .catch(error => res.json(error));
      res.json({ successful: true });
    });
  }
);

// get user profile data
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find({ user: req.user.id }).then(profile => {
      return res.json(profile);
    });
  }
);

// create new profile
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

// Update profile data
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
