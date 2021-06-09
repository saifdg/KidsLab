const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Jeux = require('../../models/Jeux2');
const competance = require('../../models/Competance')
const { check, validationResult } = require('express-validator');



// @route Get api/jeux/:id
// @desc Get jeux by id
// @access Private
router.post('/:id', [auth, [
    check('question', 'Le question de categorie est obligatoire').not().isEmpty(),
    check('reponse', 'Le reponse est obligatoire').not().isEmpty()
]
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { type, image, reponse, question } = req.body
            const jeux2 = new Jeux({ type, image, reponse, question })
            jeux2.user = req.user.id
            jeux2.competance = req.params.id
            const jeux = await jeux2.save();
            res.json(jeux)
        } catch (error) {
            console.log(error.message)
        }

    })



// @route Get api/jeux2
// @desc get all jeux
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const jeux2 = await Jeux.find().sort({ date: -1 });
        res.json(jeux2);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
})



// @route Get api/jeux/:id
// @desc Get jeux by id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const jeux2 = await Jeux.findById(req.params.id);

        if (!jeux2) {
            return res.status(404).json({ msg: "Jeux n'existe pas" });
        }
        res.json(jeux2);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Jeux introuvable' });
        }
    }
});



//get jeux par competance
//get/jeux2/:id/competance
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

module.exports = router