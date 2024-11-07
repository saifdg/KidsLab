const mongoose = require('mongoose');
const Schema=mongoose.Schema

const parentSchema = new Schema({
    emailParent:{
        type:String,
        //required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


})

module.exports = Parent = mongoose.model('parent', parentSchema);