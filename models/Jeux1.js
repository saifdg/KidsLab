const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const jeux1Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    competance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'competance'
    },
    type: {
        type: String,
        required: true,
        default: "algo1"
    },
    image: {
        type: String,
        required: true
    },
    reponse: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true

    }, 
    categorie: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Jeux1 = mongoose.model('jeux1', jeux1Schema);