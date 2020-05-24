const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = Note = mongoose.model('note',NoteSchema);