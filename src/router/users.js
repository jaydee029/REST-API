const express =require("express")
const router=express.router
const {handleSignup,handleLogin}=require("../controller/users")

router.post('/signup',handleSignup)
router.post('/login',handleLogin)

module.exports=router