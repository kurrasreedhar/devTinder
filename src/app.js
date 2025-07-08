const express= require("express")
const connectDB= require("./config/database")
const app= express()
const cookieParser = require("cookie-parser")
const authRouter= require("./routes/auth")
const profileRouter= require("./routes/profile")
const requestRouter= require("./routes/request")
const userRouter= require("./routes/user")
const cors= require("cors")


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
 app.use(express.json())
 app.use(cookieParser())

 app.use("/",authRouter)
 app.use("/",profileRouter)
 app.use("/",requestRouter)
 app.use("/",userRouter)

{/*app.get("/user",async(req,res)=>{
   
  try{ const data= await User.find({})
   res.send(data)}
   catch(err){
    res.status(400).send("error")
   }
})

app.get("/find", async(req,res)=>{
      const userid= req.body.userId
      console.log(userid)
    try{
        const data= await User.findById(userid)
        res.send(data)
    }
    catch(err){
        res.status(400).send("error")
    }

})

app.delete("/delete",async(req,res)=>{
    const id= req.body.userId
    try{
        await User.findByIdAndDelete(id)
        res.send("user deleted ")
    }catch(err){
        res.status(400).send("error")
    }

}) */}



connectDB()
.then(()=>{
    console.log("database connected")
    app.listen(5566,()=>{
    console.log("hello from 5566 server")
})
})
.catch((err)=>{
   console.error("database connection error ")
})