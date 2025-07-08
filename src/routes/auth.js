const express= require("express")
const authRouter= express.Router()
const bcrypt= require("bcrypt")
const {Validation}= require("../utils/validation")
const User = require("../model/userModel")


authRouter.post("/login",async(req,res)=>{
try{
    const {emailId,password}= req.body;
    const user = await User.findOne({emailId:emailId})
    
    if(!user){
        throw new Error("invalid credentials")
    }
    const match = await user.validatePassword(password)
    if(!match){
         throw new Error("invalid credentials")
    }
      const token = await user.getJWT()
      res.cookie("token",token, {
    expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hours
  })
    res.send(user)

}
catch(err){
    console.log(err)
 res.status(400).send("error" + err.message)
}

 })

authRouter.post("/signup", async(req, res)=>{
    try{    
      Validation(req)
           const {firstName, lastName,emailId,password}= req.body;
           const Hpassword=await bcrypt.hash(password, 10)
        const user= new User({
            firstName,
            lastName,
            emailId,
            password:Hpassword,
        })
     const savedUser=  await user.save()
      const token = await savedUser.getJWT()
      res.cookie("token",token, {
    expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hours
             })
     res.json({message:"user saved successfully",data:savedUser})
    }catch(err){
        res.send("error in signup process "+err.message)
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
         expires: new Date(Date.now()),
    })
    res.send("logout sucessfully")
})

module.exports = authRouter;