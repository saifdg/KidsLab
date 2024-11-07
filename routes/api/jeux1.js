const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Jeux = require('../../models/Jeux1');
const competance = require('../../models/Competance')
const { check, validationResult } = require('express-validator');

//create jeux1
//post/jeux1/:id
router.post('/:id', [auth, [
    check('question', 'Le question de categorie est obligatoire').not().isEmpty(),
    check('reponse', 'La reponse est obligatoire').not().isEmpty()
]
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        try {
            const file = req.files.file;

            file.mv(`${__dirname}/../../my-project/public/jeux1/${file.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            file.mv(`${__dirname}/../../admin-kidslab/public/jeux1/${file.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            const image = `/jeux1/${file.name}`
            const { reponse, question, categorie } = req.body
            const jeux1 = new Jeux({ reponse, question, image, categorie })
            jeux1.user = req.user.id
            jeux1.competance = req.params.id
            const jeux = await jeux1.save();
            res.json({ msg: 'Bien crée' })
        } catch (error) {
            console.log(error.message)
        }

    })

// @route Get api/jeux1
// @desc get all jeux
// @access Private
router.get('/', async (req, res) => {
    try {
        const jeux1 = await Jeux.find().sort({ date: -1 });
        res.json(jeux1);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
})





// @route Get api/jeux/:id
// @desc Get jeux by id
// @access Private
router.get('/:id', async (req, res) => {
    try {
        const jeux1 = await Jeux.findById(req.params.id);

        if (!jeux1) {
            return res.status(404).json({ msg: "Jeux n'existe pas" });
        }
        res.json(jeux1);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Jeux introuvable' });
        }
    }
});



//get jeux par competance
//get/jeux1/:id/competance
//public
router.get('/:id/competance', async (req, res) => {
    try {
        const competance = await Competance.findById(req.params.id);

        if (!competance) {
            return res.status(404).json({ msg: 'Competance introuvable   ' });
        }

        const jeux = await Jeux.find({ competance: req.params.id })

        res.status(200).json(jeux);

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Jeux introuvable' });
        }
        res.status(500).send('Server Error')

    }
})



// @route DELETE api/jeux2/:id
// @desc Delete jeux2
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const jeux = await Jeux.findById(req.params.id);

        if (!jeux) {
            return res.status(404).json({ msg: 'Jeux introuvable   ' });
        }

        if (jeux.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: "utilisateur non autorisé" })
        }
        await jeux.remove();
        res.json({ msg: `jeux supprimé` });


    } catch (error) {
        res.status(500).send('Server Error')

    }
});

// @route Update api/jeux1/:id
// @desc update jeux1
// @access Private
router.put('/:id', [
    check('question', 'Le question est obligatoire').not().isEmpty(),
    check('reponse', 'La reponse est obligatoire').not().isEmpty(),
], auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const jeux = await Jeux.findById(req.params.id);
        const { file, img, question, reponse, competance, categorie } = req.body
        if (!jeux) {
            return res.status(404).json({ msg: 'Jeux introuvable   ' });
        }
        let fileup = ''
        if (file == 'old') {
            fileup = img
        } else {
            const file = req.files.file;

            file.mv(`${__dirname}/../../my-project/public/jeux1/${file.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            file.mv(`${__dirname}/../../admin-kidslab/public/jeux1/${file.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }

            });
            fileup = `/jeux1/${file.name}`
        }


        await Jeux.findByIdAndUpdate(req.params.id, { question, reponse, image: fileup, competance, categorie }, {
            new: true,
            runValidators: true
        });
        res.json({ msg: `jeux modifié` });


    } catch (error) {
        res.status(500).send('Server Error')

    }
});

module.exports = router