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
    check('question', 'Le question est obligatoire').not().isEmpty(),
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
            const correct = `/uploads/${req.files.Correct.name}`
            let Array = []
            req.files.file.forEach(element => {
                element.mv(`${__dirname}/../../my-project/public/uploads/${element.name}`, err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }

                })
                element.mv(`${__dirname}/../../admin-kidslab/public/uploads/${element.name}`, err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }

                })
                Array.push(`/uploads/${element.name}`)
            });
            const { question,categorie } = req.body
            const files = Array
            const reponse = correct
            const jeux2 = new Jeux({ question, files, reponse,categorie })
            jeux2.user = req.user.id
            jeux2.competance = req.params.id
            const jeux = await jeux2.save();
            res.json({ msg:'Bien crée'})
            /* }*/

        } catch (error) {
            console.log(error.message)
        }

    })



// @route Get api/jeux2
// @desc get all jeux
// @access Private
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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


// @route DELETE api/jeux2/:id
// @desc Delete jeux2
// @access Private
router.delete('/:id',auth,async(req,res)=>{
    try {
        const jeux=await Jeux.findById(req.params.id);
        
        if(!jeux){
            return res.status(404).json({msg:'Jeux introuvable   '});
        }

        if(jeux.user.toString()!==req.user.id){
            return res.status(404).json({msg:"utilisateur non autorisé"})
        }
        await jeux.remove();
        res.json({msg:`jeux supprimé`});

       
    } catch (error) {
        res.status(500).send('Server Error')
        
    }
});


// @route Update api/jeux2/:id
// @desc update jeux2
// @access Private
router.put('/:id', [
    check('question', 'Le question est obligatoire').not().isEmpty(),
],auth,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const jeux=await Jeux.findById(req.params.id);
        const {file,question,oldFiles,reponse,categorie,competance,Correct}=req.body
        if(!jeux){
            return res.status(404).json({msg:'Jeux introuvable   '});
        }
      let ar = []
      oldFiles.forEach(element=>{
        ar.push(element)
      })

        let Array=[]    
        let correc=''
      
  
        if(Correct=='old')
        {
          
            
            correc=reponse
        }else{
        correc=`/uploads/${req.files.Correct.name}`
        }
        
        if(file=='old'){ 
                Array=ar
        }else {
            req.files.file.forEach(element => {
                element.mv(`${__dirname}/../../my-project/public/uploads/${element.name}`, err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }

                })
                element.mv(`${__dirname}/../../admin-kidslab/public/uploads/${element.name}`, err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }

                })
                Array.push(`/uploads/${element.name}`)
                
            });
        }
        
        await Jeux.findByIdAndUpdate(req.params.id,{question:question,reponse:correc,files:Array,categorie,competance},{
            new:true,
            runValidators:true
        });
        res.json({msg:`jeux modifié`});

       
    } catch (error) {
        res.status(500).send('Server Error')
        
    }
});

module.exports = router