const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Categorie = require('../../models/Categorie');
const auth=require('../../middleware/auth');
const User=require('../../models/User');



// @route Post api/categorie
// @desc Create categorie
// @access Private
router.post('/',[auth, [
    check('name', 'Le nom de categorie est obligatoire').not().isEmpty(),
    check('description', 'Le description est obligatoire').not().isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description,imageUrl} = req.body;
        try{
            const categorie=new Categorie({
            name
            ,description,
            imageUrl,
            user:req.user.id
            
        })
        await categorie.save();
        res.json(categorie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Erreur ')
    }
    
});


// @route DELETE api/categorie/:id
// @desc Delete categorie
// @access Private
router.delete('/:id',auth,async(req,res)=>{
    try {
        const categorie=await Categorie.findById(req.params.id);
        
        if(!categorie){
            return res.status(404).json({msg:'catégorie introuvable   '});
        }

        
        await categorie.remove();
        res.json({msg:`Catégorie supprimé`});

       
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Catégorie introuvable'});
        } 
        res.status(500).send('Server Error')
        
    }
});




// @route Get api/categorie
// @desc get all categorie
// @access Private
router.get('/',async(req,res)=>{
    try {
        const categorie=await Categorie.find().sort({date:-1});
        res.json(categorie);
    } catch (error) {
        console.error(err.message);
            res.status(500).send('Server Error')
        
    }
})



// @route Get api/categorie/:id
// @desc Get categorie by id
// @access Private
router.get('/:id',auth,async(req,res)=>{
    try {
        const categorie=await Categorie.findById(req.params.id);

        if(!categorie){
            return res.status(404).json({msg:'Categorie not found'});
            
        }
        res.json(categorie);
    }  catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId'){
            return res.status(404).json({msg:'categori introuvable'});
        } 
    } 
});


// @route Update api/categorie/:id
// @desc update categorie
// @access Private
router.put('/:id',auth,async(req,res)=>{
    try {
        const categorie=await Categorie.findById(req.params.id);
        
        if(!categorie){
            return res.status(404).json({msg:'catégorie introuvable   '});
        }

        
        await Categorie.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.json({msg:`categorie modifié`});

       
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Categorie introuvable'});
        } 
        res.status(500).send('Server Error')
        
    }
});


module.exports = router;