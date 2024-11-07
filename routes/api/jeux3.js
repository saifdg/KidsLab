const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Jeux = require('../../models/Jeux3');
const competance = require('../../models/Competance')
const { check, validationResult } = require('express-validator');


// @route Get api/jeux/:id
// @desc Get jeux by id
// @access Private
router.post('/:id', [auth, [
    check('question', 'Le question est obligatoire').not().isEmpty(),
    check('jeuxType', "L'ordre de jeux est obligatoire").not().isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.files === null) {
            return res.status(400).json({ errors: 'No file uploaded' });
        }
        try {

            const { question, reponse, jeuxType,categorie } = req.body

            const jeux3 = new Jeux({ question, reponse, jeuxType,categorie })
            jeux3.user = req.user.id
            jeux3.competance = req.params.id
            const jeux = await jeux3.save();
            res.json({ msg:'Bien Crée'})
            /* }*/

        } catch (error) {
            console.log(error.message)
        }

    })



// @route Get api/jeux3
// @desc get all jeux
// @access Private
router.get('/', async (req, res) => {
    try {
        const jeux3 = await Jeux.find().sort({ date: -1 });
        res.json(jeux3);
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
        const jeux3 = await Jeux.findById(req.params.id);

        if (!jeux3) {
            return res.status(404).json({ msg: "Jeux n'existe pas" });
        }
        res.json(jeux3);
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

// @route DELETE api/jeux3/:id
// @desc Delete jeu3
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const jeux = await Jeux.findById(req.params.id);
        if (!jeux) {
            return res.status(404).json({ msg: 'Jeux introuvable   ' });
        }

        await jeux.remove();
        res.json({ msg: `jeux supprimé` });


    } catch (error) {
        res.status(500).send('Server Error')

    }
});


// @route Update api/jeux3/:id
// @desc update jeux3
// @access Private
router.put('/:id' , [
    check('question', 'Le question de categorie est obligatoire').not().isEmpty(),
    check('jeuxType', 'Le Type de jeux est obligatoire').not().isEmpty(),
], auth , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const jeux = await Jeux.findById(req.params.id);

        if (!jeux) {
            return res.status(404).json({ msg: 'Jeux introuvable   ' });
        }

        await Jeux.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json({ msg: `jeux modifié` });


    } catch (error) {
        res.status(500).send('Server Error')

    }
});

module.exports = router