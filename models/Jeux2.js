const mongoose = require('mongoose');
const crypto=require('crypto');
const bcrypt=require('bcryptjs');


const jeux1Schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    competance:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'competance'
    },
    type: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    
    reponse: {
        type: String,
        required: true,
    },
    question:{
        type:String,
        required: true

    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = Jeux2 = mongoose.model('jeux2', jeux1Schema);