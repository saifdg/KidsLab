const mongoose = require('mongoose');
const crypto=require('crypto');
const bcrypt=require('bcryptjs');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt=require('jsonwebtoken');
const config=require('config')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type:String,
        enum:['user','formateur','admin'],
        default:'user'
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: true

    },
    file: {
        type: String
    },
    sub: {
        type: String
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    date:{
        type:Date,
        default:Date.now
    }
});

//match user entered password to hashed password in DB
UserSchema.methods.matchPassword=async function(entered){
    return await bcrypt.compare(entered,this.password)
}

//Generate and hash password token
UserSchema.methods.getResetPasswordToken =function(){

    //Generate token
    const resetToken=crypto.randomBytes(20).toString('hex');

    //Hash token & set to resetPasswordToken field
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')

    //Set expire
    this.resetPasswordExpires=Date.now()+10*60*1000;

    return resetToken;
}


UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},config.get('jwtSecret'),{
        expiresIn:'5m'
    })
}
    

module.exports = User = mongoose.model('user', UserSchema);