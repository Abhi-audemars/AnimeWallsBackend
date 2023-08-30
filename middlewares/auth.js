const jwt=require("jsonwebtoken")
const auth=async(req,res,next)=>{
    try{

        const token=req.header('x-auth-token');
        if(!token) return res.status(401),json({msg:"No auth token"})

        const verifies=jwt.verify(token,"PasswordKey");
        if(!verifies) return res.status(401).json({msg:"Token verification failed"})

        req.user=verifies.id;
        req.token=token;

        next();

    }catch(e){
        res.status(500).json({err:e.message})
    }
}

module.exports=auth;