const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Competance = require('../../models/Competance');
const auth=require('../../middleware/auth'); 
const User = require('../../models/User');
const Categorie = require('../../models/Categorie');


// @route Get api/competance
// @desc Create competance
// @access Private
router.post('/:id',[auth, [
    check('name', 'Le nom de competance est obligatoire').not().isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;
        
        try{
            req.body.user=req.user.id
            req.body.categorie=req.params.id
            const categorie=await Categorie.findById(req.params.id);
            if(!categorie){
                return res.status(404).json({msg:'catégorie introuvable   '});
            }


         const competance= await Competance.create(req.body)
        res.json({msg:'Competence crée avec success'});
    

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Erreur ')
}
});


// @route Get api/competance/:id
// @desc get competances by categorie
// @access Private
router.get('/:id/categorie',async(req,res)=>{
    try {
        const categorie=await Categorie.findById(req.params.id);
        
        if(!categorie){
            return res.status(404).json({msg:'Categorie introuvable   '});
        }

        const competance=await Competance.find({categorie:req.params.id})

        res.status(200).json(competance);

    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Compétance introuvable'});
        } 
        res.status(500).send('Server Error')
        
    }
});



// @route Get api/competances
// @desc get all competances
// @access Private
router.get('/',async(req,res)=>{
    try {
        const competance=await Competance.find().sort({date:-1});
        res.json(competance);
    } catch (error) {
        console.error(err.message);
            res.status(500).send('Server Error')
        
    }
})


// @route DELETE api/competance/:id
// @desc Delete competance
// @access Private
router.delete('/:id',auth,async(req,res)=>{
    try {
        const competance=await Competance.findById(req.params.id);
        
        if(!competance){
            return res.status(404).json({msg:'compétance introuvable   '});
        }

        
        await competance.remove();
        res.json({msg:`compétance supprimé`});

       
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Compétance introuvable'});
        } 
        res.status(500).send('Server Error')
        
    }
});



// @route Update api/competance/:id
// @desc update competance
// @access Private
router.put('/:id', [
    check('name', 'Le nom de competence est obligatoire').not().isEmpty(),
],auth,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const competance=await Competance.findById(req.params.id);
        
        if(!competance){
            return res.status(404).json({msg:'compétance introuvable   '});
        }

        
        await Competance.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        
        res.json({msg:`compétance modifié`});

       
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Compétance introuvable'});
        } 
        res.status(500).send('Server Error')
        
    }
});


// @route Get api/competance/:id
// @desc Get competance by id
// @access Private
router.get('/:id',auth,async(req,res)=>{
    try {
        const competance=await Competance.findById(req.params.id);

        if(!competance){
            return res.status(404).json({msg:'Compétance introuvable'});
            
        }
        res.json(competance);
    }  catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId'){
            return res.status(404).json({msg:'Compétance introuvable'});
        } 
    } 
});





module.exports = router;