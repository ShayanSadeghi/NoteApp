const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/NoteApp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
