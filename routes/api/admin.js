const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");
const path = require("path");
const auth=require('../../middleware/auth')
const{authorize}=require('../../middleware/authorize')  
const nodemailer=require('nodemailer')
const sendMail=require('../../util/sendEmail')
  

// @route POST api/admin
// @desc Authonicate admin
// @access Public
router.post('/auth', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //See if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'email ou password incorrect ' }] })
            }
            //check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'email ou password incorrect ' }] })
            }
            //check role
            if(user.role!=="admin"){
                return res.status(400).json({ errors: [{ msg: "seul l'administrateur peut se connecter ici" }] })
            }

            

            //Return jsonwebtoken

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }

    });


module.exports = router;