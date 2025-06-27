const validator= require("validator")

const Validation=(req)=>{
 const {firstName, lastName,email,password}= req.body
if(!firstName || !lastName){
    throw new Error ("name is not valid")
}
else if(!validator.isEmail){
 throw new Error ("email is not valid")
}
else if(!validator.isStrongPassword){
    throw new Error("password is not valid")
}
}

const Validatekeysdata=(req)=>{
    const allowedDataFileds=["firstName","lastName","age","photoUrl","gender","skills","bio"]
    const value=Object.keys(req.body).every(key=>allowedDataFileds.includes(key))
    return value
}
module.exports= {Validation,Validatekeysdata}