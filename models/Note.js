const mongoose = require('mongoose');
const Schema = mangoose.Schema();

//Create Schema
const NoteSchema = new Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = Note = mongoose.Schema('note',NoteSchema);