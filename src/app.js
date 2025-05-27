const express= require("express")
const app= express()


app.post("/test",(req,res)=>{
    res.send("hello from post call")
})

app.get("/test",(req,res)=>{
    res.send("hello from get call")
})

app.delete("/test",(req,res)=>{
    res.send("hello from delete user")
})

app.use("/test",(req,res)=>{
    res.send("hello from main call")
})



app.listen(5566,()=>{
    console.log("hello from 5566 server")
})