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
        default: 'algo2'
    },
    reponse: {
        type: String,
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
    },
    files: {
        type: Array,
    }
});


module.exports = Jeux2 = mongoose.model('jeux2', jeux1Schema);