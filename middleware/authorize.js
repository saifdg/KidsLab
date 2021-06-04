const jwt=require('jsonwebtoken')
const User=require('../models/User')


//protect routes
exports.protect=(async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //Set token from bearer token in header
        token=req.headers.authorization.split(' ')[1];
        //Set token from cookie
    }
  //  else if (req.cookies.token){
    //    token=req.cookies.token
   // }


    //Make sure token exists
    if(!token){
    }

    try{
        //Verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        req.user=await User.findById(decoded.id);

        next();
    }catch(err){    
        console.log(err.message)
    }
}); 


//Grant access to specific roles
exports.authorize=(...roles)=>{
    return(req,res,next)=>{
        
        if(!roles.includes(req.user._role)){
            console.log(req.user.role)
            return res.status(401).json({msg:`le role ${req.user.role} non autorisé à accéder à cet route`})
        }
        next();
    }
}