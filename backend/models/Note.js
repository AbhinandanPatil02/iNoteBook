// import mongoose from 'mongoose';
// // const { Schema } = mongoose;
// const { Schema } = mongoose;

// const NoteSchema = new Schema({
//     title :{
//         type : String,
//         required : true
//     },
//     description :{
//         type : String,
//         required : true,
//         unique:true
        
//     },
//     tag:{
//         type : String,
//         default:"General"
   
//     },
//     date :{
//         type : Date,
//         default:Date.now
//     }
  
// });


// module.exports=mongoose.model('notes',NoteSchema)

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    // TO INCERPT THE NOTES FROM OTHER USER
    user:{
        type:mongoose.Schema.Types.ObjectId,

        // we have to give here refference
        ref:'user'


    },




    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NoteSchema);


