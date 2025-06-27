const mongoose= require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt= require("bcrypt")

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:20,
        trim:true
    },
    lastName:{
        type:String,
        trim:true,
    },
    emailId:{
        type:String,
        required:true,
         trim:true,
         lowercase:true,
         unique:true,
         validate(value){
            if(!validator.isEmail(value)){
                throw new Error("error update email"+value)
            }
         }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("error updating password"+value)   
        }
    }},
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender is not valid")
            }
        },
    },
    photoUrl:{
       type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("error updateing url"+value)
            }
        }

    },
    bio:{
        type:String,
        default:"i am a tinder user"
    },
    skills:{
        type:[String],

    },

}, { timestamps: true })

userSchema.index({gender:1})

userSchema.methods.getJWT=async function(){
    const user= this
    const token = await jwt.sign({_id:user._id},"Dev@tinder1",{ expiresIn: '1d' },)
    return token
}
userSchema.methods.validatePassword= async function(passwordInputGivenByUser){
    const user= this
  const match= await bcrypt.compare(passwordInputGivenByUser, user.password)
  return match
}

const user= mongoose.model("user",userSchema)
module.exports= user