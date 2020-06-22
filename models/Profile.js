const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
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
    type: pat,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
