const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const sendEmail=require('../../util/sendEmail')
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer')






module.exports=router