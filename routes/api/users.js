const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const JeuxTraiter = require('../../models/JeuxTraiter');
const Parent = require('../../models/Parent');
const sendMail3 = require("../../util/sendEmailParent")
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require("config");
const path = require("path");
const auth = require('../../middleware/auth')
const { authorize } = require('../../middleware/authorize')
const nodemailer = require('nodemailer')
const sendMail = require('../../util/sendEmail')
const sendMail2 = require('../../util/sendEmail2')
const autorization = require("../../middleware/autorization")
require('dotenv').config({
    path: `${__dirname}/../../config/config.env`
})





// @route POST api/users
// @desc Register user
// @access Public
router.post('/', [
    check('firstName', 'Le nom est obligatoire').not().isEmpty(),
    check('lastName', 'Le prenom est obligatoire').not().isEmpty(),
    check('gender', 'Sexe est obligatoire').not().isEmpty(),
    check('email', 'email invalide').isEmail(),
    check('password', 'Le mot de pass doit ètre 6 charactères ou plus').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, role, gender, password, sub, file } = req.body;

        let fileup = ''

        try {

            //See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "l'email existe déjà" }] });
            }
            if (file == 'none') {
                fileup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
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

            let dateexp = null
            const passwordHash = await bcrypt.hash(password, 12)
            user = new User({
                firstName, lastName, email, role, gender, password, file: fileup, sub, dateexp
            });
            if (req.body.sub === "mensuel") {
                dateexp = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
            } else {
                dateexp = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000 * 12))
            }

            const token = jwt.sign({ firstName, lastName, email, role, gender, password: passwordHash, file: fileup, sub, dateexp: dateexp }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100m' })


            const url = `http://localhost:3000/user/validation/${token}`
            sendMail(email, url, "verifier votre email", "Congratulations! You're almost a member of KidsLab Just click the button below to validate your email address.")
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




// @route POST api/users
// @desc Register user
// @access Public
router.post('/admin', [
    check('firstName', 'Le nom est obligatoire').not().isEmpty(),
    check('lastName', 'Le prenom est obligatoire').not().isEmpty(),
    check('gender', 'Sexe est obligatoire').not().isEmpty(),
    check('email', 'email invalide').isEmail(),
    check('password', 'Le mot de pass doit ètre 6 charactères ou plus').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, role, gender, password, sub, file } = req.body;

        let fileup = ''

        try {

            //See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "l'email existe déjà" }] });
            }
            if (file == 'none') {
                fileup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
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

            let dateexp = null

            if (req.body.sub === "mensuel") {
                dateexp = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
            } else {
                dateexp = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000 * 12))
            }
            const passwordHash = await bcrypt.hash(password, 12)
            user = new User({
                firstName, lastName, email, role, gender, password: passwordHash, file: fileup, sub, dateexp
            });
            // const token = jwt.sign({ firstName, lastName, email, role, gender, password: passwordHash, file: fileup, sub, dateexp: dateexp }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100m' })
            await user.save()

            //const url = `http://localhost:3000/user/validation/${token}`
            // sendMail(email, url, "verifier votre email", "Congratulations! You're almost a member of KidsLab Just click the button below to validate your email address.")
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

            res.json({ msg: "Compte crée avec success " })

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


//create parent
router.post('/parent', async (req, res) => {
    const xx = await User.findOne({ email: mail })
    const parent = new Parent({
        email: xx.email,
        password: xx.password
    })
    console.log(xx.email)
    await parent.save()
    res.json('Parent ajouté avec succés')
})



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
        const { firstName, lastName, file, img, newPassword } = req.body

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
            firstName, lastName, file: fileup, password: passwordHash
        })
        const user1 = await User.findById(req.params.id).select('+password');

        res.json({ msg: "Bien modifié" });


    } catch (error) {
        res.status(500).json(error.message)

    }
});

// @route POST api/users/forgetpassword
// @desc forgot password
// @access Public

router.post('/forgotpassword', async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "Cette email n'existe pas" })
        }
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
        const url = `http://localhost:3000/user/resetpassword/${token}`
        sendMail(email, url, "Réinitialisez votre mot de passe", " Cliquer le button ci-dessous pour restorer votre mot de pass .")
        res.json({ msg: "vérifiez votre email pour réinitialiser votre mot de passe" })


    } catch (err) {
        res.json({ msg: err.message })
    }
})


// @route POST api/users/resetpassword
// @desc reset password
// @access Private 
router.post('/resetpassword', [
    check('password', 'Le mot de pass doit ètre 6 charactères ou plus').isLength({ min: 6 })
], autorization, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { password } = req.body
        const passwordHash = await bcrypt.hash(password, 12)
        await User.findOneAndUpdate({ _id: req.user.id }, {
            password: passwordHash
        })
        res.json({ msg: "Mot de passe changé avec succès" })
    } catch (error) {
        res.json({ msg: err.message })
    }


})



// @route Get api/user
// @desc get all user
// @access Private
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });

        }
        res.json({ user });
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
        const { firstName, lastName, file, img, role } = req.body
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


// @route Update api/user/:id
// @desc update user details
// @access Private
/*router.put('/updatedetailsall/:id', [
    check('firstName', 'le prénom est obligatoire').not().isEmpty(),
    check('lastName', 'le nom est obligatoire').not().isEmpty(),
    check('file', 'le photo est obligatoire').not().isEmpty(),
    check('file', 'le photo est obligatoire').not().isEmpty(),
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
*/
// @route Update api/user/:id
// @desc update score
// @access Private
router.put('/score/:id', [
    check('score', 'le score est obligatoire').not().isEmpty(),
    check('nbt', 'nbt est obligatoire').not().isEmpty(),
    check('nbf', 'nbf est obligatoire').not().isEmpty(),
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
            score: req.body.score,
            nbt: req.body.nbt,
            nbf: req.body.nbf
        }

        await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });
        res.json({ msg: `score modifié` });


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



// @route POST api/user/contact
// @desc contacter admin user
// @access public
router.post('/contact', [
    check('firstName', 'Le nom est obligatoire').not().isEmpty(),
    check('lastName', 'Le prenom est obligatoire').not().isEmpty(),
    check('txt', "écrivez un message s'il vous plaît").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, txt, firstName, lastName } = req.body
        sendMail2(email, txt, firstName, lastName)
        res.json({ msg: "email envoyer avec succès" })

    } catch (err) {
        res.send(err.message);
    }



})


//Get all jeux traiter
router.get("/jeuxtraiter/jeux", auth, async (req, res) => {


    const jeux = await JeuxTraiter.find({ user: req.user.id })
    res.json(jeux)
})

//jeux fault
router.put("/jeuxtraiter", auth, async (req, res) => {

    const jj = await JeuxTraiter.findOne({ user: req.user.id })
    jj.fault.unshift({ fault: req.body.fault, type: req.body.type })
    //jj.fault.unshift({})
    await jj.save()
    res.json('jeu fault saved')
})

//Post jeux traiter
router.post("/jeuxtraiter", auth, async (req, res) => {
    const xx = {
        jeux: req.body.jeux,
    }
    const jj = await JeuxTraiter.findOne({ user: req.user.id })
    //const aa=await JeuxTraiter.findOne({jeux:req.body.jeux})
    jj.jeuxTraiter.unshift(xx)
    await jj.save()
    res.json("bien enregistré")
})






//envoyer email parent
router.put('/envoyerparent', [
    check('email', 'email Apprenant est obligatoire').not().isEmpty(),
    check('emailParent', 'emailParent est obligatoire').not().isEmpty(),
    check('password', 'Le mot de pass obligatoire').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const passwordHash = await bcrypt.compare(req.body.password, user.password)

            if (passwordHash) {
                const parent1 = await Parent.findOne({ email: req.body.email })

                parent1.emailParent = req.body.emailParent
                await parent1.save()
                const jeuxt = await JeuxTraiter.findOne({ user: user._id })

                const parent = await Parent.findOne({ email: req.body.email })

                sendMail3(user.nom, user.prenom, parent.emailParent, "Tableau des statistiques de votre apprenant: ", user.score, user.nbt, user.nbf, jeuxt.fault)
                res.json({ msg: "email envoyer avec succés" })
            } else {
                return res.status(400).json({ errors: [{ msg: "coordonnées invalides" }] });
            }
        } else {
            return res.status(400).json({ errors: [{ msg: "coordonnées invalides" }] });
        }
    }

    catch {
        res.status(500).json({ msg: err.message })
    }



})
module.exports = router;