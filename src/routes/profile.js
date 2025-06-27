const express= require("express")
const profileRouter= express.Router()
const {Userauth}= require("../middelware/Userauth")
const User = require("../model/userModel")
const {Validatekeysdata}= require("../utils/validation")


profileRouter.get("/profile",Userauth,async(req,res)=>{
   try{const user= req.user
    res.send(user)}
    catch(err){
        res.status(400).send("error"+err.message)
    }
})

profileRouter.patch("/update/:userId",async(req,res)=>{
    const userId = req.params?.userId
    const data= req.body
   console.log(userId)
    try{
        const Allowed_update=["password","photoUrl","age","bio","gender","skills"]
        const update= Object.keys(data).every((key)=>Allowed_update.includes(key))
        if(!update){
            throw new Error("update cannot be done")
        }
        if(data.skills.length>=10){
            throw new Error("skills cannot be greater than 10")
        }
    await User.findByIdAndUpdate(userId,data,{runValidators:true ,})
        res.send("data is updated")
    }   catch(err){
        res.status(400).send("update error"+err.message)
    }

})

profileRouter.patch("/profile/edit",Userauth,async(req,res)=>{
    const loggedInUser= req.user;
    const returnedvalue= Validatekeysdata(req)
    try{
      if(!returnedvalue){ 
         throw new Error("invalid edits")}
      Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key])  
         
      await loggedInUser.save()
    res.json({message: `${loggedInUser.firstName}update your profile` , data:loggedInUser})
      }
      catch(err){
         res.send("error in login process "+err.message)
}
})

module.exports= profileRouter;