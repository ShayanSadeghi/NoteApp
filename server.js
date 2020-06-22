const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const notes = require("./routes/api/notes");
const profile = require("./routes/api/profile");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/NoteApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/notes", notes);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
