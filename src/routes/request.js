const express= require("express")
const requestRouter= express.Router()
const {Userauth}= require("../middelware/Userauth")
const ConnectionRequest= require("../model/connectionModel")
const User= require("../model/userModel")

requestRouter.post("/request/send/:status/:toUserId",Userauth,async(req,res)=>{     
    try{     
    const fromUserId = req.user._id;
    const toUserId= req.params.toUserId
    const status= req.params.status

    const allowedStatus= ["interesed","ignore",]
    if(! allowedStatus.includes(status)){
        throw new Error("invalid api status")
    }
     
   const isConectionExist=await ConnectionRequest.findOne(
    {$or:[{ fromUserId,toUserId},{ fromUserId:toUserId , toUserId:fromUserId  }]})
   if(isConectionExist){
    throw new Error("can not send request as you already sent")
   }
     const find= await User.findById(toUserId)
     if(!find){
        throw new Error("ivalid userid")
     }
    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    })
     const data = await connectionRequest.save()
    res.json({message:" connection request sent successfully ",data,})
    }    
    catch(err){
        res.status(400).send("error in connection request "+ err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",Userauth,async(req,res)=>{
    try{
        const loggedInuser= req.user
        const {status,requestId}=req.params
        const isAllowed=["accepted","rejected",]
        if(!isAllowed.includes(status)){
            throw new Error("invalid status ")
        }
        const connectionRequest= await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInuser._id,
            status:"interesed"
        })
        if(!connectionRequest){
            throw new Error("invalid connection id request")
        }
        connectionRequest.status=status;
        const data= await connectionRequest.save()
        res.json({message:`${"connection is valid"}`, data})

    }
    catch(err){
        res.status(400).send("error in review request "+ err.message)
    }

})

module.exports= requestRouter;