const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Jeux = require('../../models/Jeux1');
const competance = require('../../models/Competance')


//create jeux1
//post/jeux1/:id
router.post('/:id', auth, async (req, res) => {

    try {
        const { type, image, reponse, question } = req.body
        const jeux1 = new Jeux({ type, image, reponse, question })
        jeux1.user = req.user.id
        jeux1.competance = req.params.id
        const jeux = await jeux1.save();
        res.json({ jeux })
    } catch (error) {
        console.log(error.message)
    }

})

// @route Get api/jeux1
// @desc get all jeux
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const jeux1 = await Categorie.find().sort({ date: -1 });
        res.json(jeux1);
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


module.exports = router