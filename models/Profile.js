const mongoose=require('mongoose');

const ProfileSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=profile=mongoose.model('profile',ProfileSchema);