const jwt = require("jsonwebtoken")
const User= require("../model/userModel")

const Userauth=async(req,res,next)=>{
  try{
 const cookies= req.cookies
 const {token}= cookies
 if(!token){
  res.status(400).send("kindly user login")
 }
 const decoded = await jwt.verify(token, "Dev@tinder1");
 const id= decoded._id;
 const user =await  User.findById(id) 
 if(!user){
  throw new Error("update cannot be done")
 }
req.user=user;
next()}
catch(err){
  res.status(400).send("error" + err.message)
}
  
}
module.exports={Userauth,}
