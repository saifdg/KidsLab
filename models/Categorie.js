const mongoose = require('mongoose');
const Schema=mongoose.Schema


const categorieSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl:{
        type:String,
        default:"IMG_20210506_120550"
    },
    nbComp:{
        type:Number,
        default:null
    },
    
});


module.exports = Categorie = mongoose.model('categorie', categorieSchema);