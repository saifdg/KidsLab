const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const {check,validationResult}=require('express-validator');
const User=require('../../models/User');
const Profile=require('../../models/Profile');
const Post=require('../../models/Post');
const { remove } = require('../../models/Post');
 
// @route Get api/posts
// @desc Create a post
// @access Private
router.post('/',[auth,[
    check('text','Text is required').not().notEmpty()
]
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{

        const user=await User.findById(req.user.id).select('-password');
    
        const newPost=new Post({
            text:req.body.text,
            name:user.firstName+' '+user.lastName,
            avatar:user.file,
            user:req.user.id
        })

        const post =await newPost.save();
        res.json(post);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
  
});


// @route Get api/posts
// @desc Get all posts
// @access Private
router.get('/',auth,async(req,res)=>{
try {
    const posts=await Post.find().sort({date:-1});
    res.json(posts);
} catch (error) {
    console.error(err.message);
        res.status(500).send('Server Error')
    
}
})



// @route Get api/posts/:id
// @desc Get post by id
// @access Private
router.get('/:id',auth,async(req,res)=>{
    try {
        const posts=await Post.findById(req.params.id);

        if(!posts){
            return res.status(404).json({msg:'post introuvable'});
            
        }
        res.json(posts);
    }  catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        } 
    } 
});

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete('/admin/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        const user=await User.findById(req.user.id)
        
        //
        //check on user
        if(post.user.toString() !== req.user.id &&user.role !="admin"){
            return res.status(404).json({msg:'utilisateur non autorisé '});
        }
        await post.remove();
        res.json({msg:`Post supprimer`});

       
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'post introuvable'});
        } 
        res.status(500).send('Server Error')
        
    }
});




// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete('/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        //check on user
        if(post.user.toString() !== req.user.id){
            return res.status(404).json({msg:'utilisateur non autorisé '});
        }
        await post.remove();
        res.json({msg:`Post supprimer`});

       
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'post introuvable'});
        } 
        res.status(500).send('Server Error')
        
    }
});




// @route Put api/posts/:id
// @desc Like a post
// @access Private
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        //check if the post has already been liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length>0){
            return res.status(400).json({msg:'Post déjà aimé '});
        }

        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
});


// @route Put api/posts/:id
// @desc Unlike a post
// @access Private
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        //check if the post has already been liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length===0){
            return res.status(400).json({msg:"Post n'a pas encore été aimé"});
        }

        //Get the remove index
        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf((req.user.id));

        post.likes.splice(removeIndex,1);
        
        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
})


// @route POST api/posts/comment/:id
// @desc comment a post
// @access Private
router.post('/comment/:id',[
    auth,[
        check('text','text est obligatoire').not().isEmpty()
    ]
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{

        const user=await User.findById(req.user.id).select('-password');
        const post=await Post.findById(req.params.id)
        if(!post){
            res.status(400).json({msg:"post introuvable"})
        }

        const newComment={
            text:req.body.text,
            avatar:user.file,
            name:user.firstName+' '+user.lastName,
            user:req.user.id
        };

        post.comment.unshift(newComment)
        

        await post.save();
        res.json(post.comment);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
  
});

// @route Delete api/posts/comment/:id/:comment_id
// @desc delete a comment
// @access Private
router.delete('/admin/:id/:comment_id',auth,async(req,res)=>{
    

    try{
        const post=await Post.findById(req.params.id)
        const user=await User.findById(req.user.id) 

        const comment=post.comment.find(comment=>comment.id===req.params.comment_id)

        if(!comment){
            return res.status(404).json({msg:"comment n'existe pas"});
        }

        if(comment.user.toString()!==req.user.id&&user.role!="admin"){
            return res.status(404).json({msg:"utilisateur non autorisé"})
        }


     //Get the remove index
     const removeIndex=post.comment.map(comment=>comment.user.toString()).indexOf((req.user.id));

     post.comment.splice(removeIndex,1);
     
     await post.save();
     res.json(post.comment);
      
    }catch(err){
        
        console.error(err.message);
        res.status(500).send('Server Error')
    }
  

});


// @route POST api/posts/comment/:id/:comment_id
// @desc delete a comment
// @access Private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    

    try{
        const post=await Post.findById(req.params.id)
        
        

        const comment=post.comment.find(comment=>comment.id===req.params.comment_id)

        if(!comment){
            return res.status(404).json({msg:"comment n'existe pas"});
        }

        if(comment.user.toString()!==req.user.id){
            return res.status(404).json({msg:"utilisateur non autorisé"})
        }


     //Get the remove index
     const removeIndex=post.comment.map(comment=>comment.user.toString()).indexOf((req.user.id));

     post.comment.splice(removeIndex,1);
     
     await post.save();
     res.json(post.comment);
      
    }catch(err){
        
        console.error(err.message);
        res.status(500).send('Server Error')
    }
  

});



module.exports=router;