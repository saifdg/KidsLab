const mongoose = require('mongoose');
const Schema=mongoose.Schema


const competanceSchema = new mongoose.Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    categorie: {
        type:Schema.Types.ObjectId,
        ref:'Categorie'
    },
    name: {
        type: String,
        required: true
    }
    
});


module.exports = Competance = mongoose.model('competance', competanceSchema);