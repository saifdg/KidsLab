const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");
const path = require("path");
const auth = require('../../middleware/auth')
const { authorize } = require('../../middleware/authorize')
const nodemailer = require('nodemailer')
const sendMail = require('../../util/sendEmail')
const sendMail3 = require('../../util/sendEmail3')

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
            if (user.role !== "admin") {
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



// @route Update api/user/:id
// @desc update user details
// @access Private
router.put('/updatedetails/:id', [
    check('firstName', 'le prénom est obligatoire').not().isEmpty(),
    check('lastName', 'le nom est obligatoire').not().isEmpty(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let fileup = ''
        const { firstName, lastName, file, img, role, newPassword } = req.body

        if (file == "old") {
            fileup = img
        } else {
            const files = req.files.file;

            files.mv(`${__dirname}/../../my-project/public/users/${files.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            files.mv(`${__dirname}/../../admin-kidslab/public/users/${files.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            fileup = `/users/${files.name}`
        }



        const user = await User.findById(req.params.id).select('+password');
        matchPassword = async function (enter) {
            return await bcrypt.compare(enter, user.password)
        }

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }
        //check current password
        if (!(await user.matchPassword(req.body.oldPassword))) {
            return res.status(401).json({ errors: [{ msg: "L'ancien mot de pass est incorrect" }] })
        }
        //check new password
        if (req.body.newPassword.length < 6) {
            return res.status(401).json({ errors: [{ msg: "le nouveau mot de pass doit etre plus de 6 caractères" }] })
        }


        //hash password
        const passwordHash = await bcrypt.hash(newPassword, 12)

        await User.findByIdAndUpdate({ _id: req.params.id }, {
            firstName, lastName, file: fileup, role, password: passwordHash
        })
        const user1 = await User.findById(req.params.id).select('+password');

        res.json({ msg: "Bien modifié" });


    } catch (error) {
        res.status(500).json(error.message)

    }
});
////////////////////////////////////////////////////////////////
router.put('/update/:id', [
    check('firstName', 'le prénom est obligatoire').not().isEmpty(),
    check('lastName', 'le nom est obligatoire').not().isEmpty(),
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

        let fileup = ''
        const { firstName, lastName, file, img, role, sub, gender, email } = req.body
        if (file == "old") {
            fileup = img
        } else {
            const files = req.files.file;

            files.mv(`${__dirname}/../../my-project/public/users/${files.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            files.mv(`${__dirname}/../../admin-kidslab/public/users/${files.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            fileup = `/users/${files.name}`
        }

        const fieldsToUpdate = {
            firstName,
            lastName,
            file: fileup,
            role,
            sub,
            email,
            gender
        }

        await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });
        res.json({ msg: `Bien modifié` });


    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }
        res.status(500).send('Server Error')

    }
});

// @route POST api/users
// @desc Register user
// @access Public
router.post('/formateur', [
    check('firstName', 'Le nom est obligatoire').not().isEmpty(),
    check('lastName', 'Le prenom est obligatoire').not().isEmpty(),
    check('gender', 'Sexe est obligatoire').not().isEmpty(),
    check('description', 'description est obligatoire').not().isEmpty(),
    check('email', 'email invalide').isEmail(),
    check('password', 'Le mot de pass doit ètre 6 charactères ou plus').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, gender, password, sub, description } = req.body;

        let fileup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

        try {

            //See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "l'email existe déjà" }] });
            }

            const files = req.files.file;
            files.mv(`${__dirname}/../../my-project/public/cv/${files.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            files.mv(`${__dirname}/../../admin-kidslab/public/cv/${files.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });

            const image = `/cv/${files.name}`
            let dateexp = null
            const passwordHash = await bcrypt.hash(password, 12)
            user = new User({
                firstName, lastName, email, gender, password, file: fileup, sub, dateexp
            });
            const role = 'formateur'


            const token = jwt.sign({ firstName, lastName, email, role: role, gender, password: passwordHash, file: fileup, sub }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100m' })


            const url = `http://localhost:8000/app/validation/${token}`
            sendMail3(email, url, "Demande d'etre formateur", "Congratulations! You're almost a member of KidsLab Just click the button below to validate your email address.", image, description, files.name)
            //  await user.save()
            //Return jsonwebtoken
            /*const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                })*/

            res.json({ msg: "Très bien, vous avez juste besoin de vérifier votre email s'il vous plaît" })

            //const url=`${req.protocol}://${req.get('host')}/api/activate/${token}`
            //sendMail(email,url) 


        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message })
        }

    });


// @route POST api/users/activate
// @desc verify email
// @access Private
let mail = ''
router.post('/activate', async (req, res) => {

    const { token } = req.body
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({ msg: "lien incorrect ou expiré" })
            }
            const {
                firstName, lastName, email, role, gender, password, file, sub, dateexp
            } = decodedToken;
            mail = email;

            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    return res.status(400).json({ errors: "l'email existe déjà" });
                }


                let newUser = new User({
                    firstName, lastName, email, role, gender, password, file, sub, dateexp
                });
                let parent = new Parent({
                    email: email,
                    password: password
                })

                newUser.save((err, success) => {
                    if (err) {
                        console.log("error singup: ", err)
                        return res.status(400).json({ error: "error d'activation de votre account" })
                    }
                    res.json({ msg: "Compte activé avec success" })
                })
                parent.save()

            })
        })

    } else {
        return res.json({ msg: "server error" })
    }


})




router.post('/creeDb', async (req, res) => {

    const xx = await User.findOne({ email: mail })
    const newJeux = new JeuxTraiter({
        user: xx._id
    })
    await newJeux.save()

})


module.exports = router;




