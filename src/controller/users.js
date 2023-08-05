const {findUser, authenticate, create}=require("../services/users");

const handleSignup=async (req,res,next)=>{
    
    try{
        const {name,email,password}=req.body
        const user=await findUser({email})

        if(user){
            throw new Error("user already exists")
        }

        const {token} =await create({name,email,password})

        res.json({token})

    }catch(error){
        next(error)
    }
}

const handleLogin=async (req,res,next)=>{
    try{
        const {email,password}=req.body

        const user=await findUser({email})

        if(!user){
            throw new Error("User doesnt exist")
        }

        const {token} =await authenticate({email,password})
        
        res.json({token})
    }catch(error){
        next(error)
    }
}


module.exports={
    handleSignup,
    handleLogin
}