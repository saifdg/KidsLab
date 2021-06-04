const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require("config");
const path = require("path");
const auth = require('../../middleware/auth')
const { authorize } = require('../../middleware/authorize')
const nodemailer = require('nodemailer')
const sendMail = require('../../util/sendEmail')





// @route POST api/users
// @desc Register user
// @access Public
router.post('/', [
    check('firstName', 'Le nom est obligatoire').not().isEmpty(),
    check('lastName', 'Le prenom est obligatoire').not().isEmpty(),
    check('email', 'email invalide').isEmail(),
    check('password', 'Le mot de pass doit ètre 6 charactères ou plus').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, role, gender, password, file, sub } = req.body;


        try {

            //See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "l'email existe déjà" }] });
            }


            user = new User({
                firstName, lastName, email, role, gender, password, file, sub
            });

            //Enrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);


            await user.save()
            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                })



            //const url=`${req.protocol}://${req.get('host')}/api/activate/${token}`
            //sendMail(email,url) 


        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message })
        }

    });



const createActivateToken = (payload) => {
    return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '7m' })
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7m' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' })
}








const sendEmail = async (options) => {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const message = {
        from: `${process.env.FROM_NAME} <test@kidslab.com>`,
        to: 'lab.kids05@gmail.com',
        subject: 'email confirm',
        text: '<h1>Welcome</h1>'
    };

    await transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log("Message sent: %s", info.messageId);
    });



}



// @route POST api/auth/forgotpassword
// @desc Forgot password
// @access Public
router.post('/forgotpassword', async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(404).json({ msg: "cette email n'existe pas" });

    }

    //get reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false });

    //create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetpassword/${resetToken}`


    const message = `you are receiving this email because u has requested the reset password. Please make a request to : \n\n${resetUrl}`


    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset Token',
            message
        });
        res.status(200).json({ success: true, data: 'Email envoyé ' });

    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        res.status(500).json({ msg: "Le mail n'a pas pu être envoyé" });
    }




})





// @route Get api/user
// @desc get all user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.find().sort({ date: -1 });
        res.json(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
});


// @route Get api/user/:id
// @desc Get user by id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });

        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }
    }
});



// @route Update api/user/:id
// @desc update user details
// @access Private
router.put('/updatedetails/:id', [
    check('firstName', 'le prénom est obligatoire').not().isEmpty(),
    check('lastName', 'le nom est obligatoire').not().isEmpty(),
    check('file', 'le photo est obligatoire').not().isEmpty()
], auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur introuvable   ' });
        }

        const fieldsToUpdate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            file: req.body.file,
        }

        await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });
        res.json({ msg: `Utilisateur modifié` });


    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }
        res.status(500).send('Server Error')

    }
});



// @route Update api/users/updatepassword
// @desc update password
// @access Private
router.put('/updatepassword', auth, async (req, res) => {


    matchPassword = async function (enter) {
        return await bcrypt.compare(enter, this.password)

    }
    try {
        const user = await User.findById(req.user.id).select('+password');



        //check current password
        if (req.body.newPassword.length < 6) {
            return res.status(401).json({ errors: [{ msg: "le nouveau mot de pass doit etre plus de 6 caractères" }] })
        }
        if (!(await user.matchPassword(req.body.currentPassword))) {
            return res.status(401).json({ errors: [{ msg: "mot de pass incorrect" }] })
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPassword, salt);
        await user.save()


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

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }
        res.status(500).send('Server Error')

    }
});


// @route DELETE api/user/:id
// @desc Delete user
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur introuvable   ' });
        }


        await user.remove();
        res.json({ msg: `Utilisateur supprimé` });


    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }
        res.status(500).send('Server Error')

    }
});






module.exports = router;