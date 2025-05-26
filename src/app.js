const express= require("express")
const app= express()

app.use("/test",(req,res)=>{
    res.send("hello from 1")
})

app.use("/product",(req,res)=>{
    res.send("hello from 2")
})
app.use("/",(req,res)=>{
    res.send("hello from start")
})

app.listen(5566,()=>{
    console.log("hello from 5566 server")
})