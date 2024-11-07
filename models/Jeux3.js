const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const jeux3Schema = new mongoose.Schema({
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
        default: "algo3"
    },
    jeuxType: {
        type: String,
        required: true
    },
    reponse: {
        type: Array,
        required: true,
    },
    categorie: {
        type: String,
        required: true

    },
    question: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Jeux3 = mongoose.model('jeux3', jeux3Schema);