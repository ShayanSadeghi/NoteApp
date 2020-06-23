const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  job: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "uploads.files",
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
