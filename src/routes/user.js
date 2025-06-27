const express= require("express")
const userRouter= express.Router()
const{Userauth} = require("../middelware/Userauth")
const connectionRequest= require("../model/connectionModel")
const Users=require("../model/userModel")
   const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/request/pendings" ,Userauth,async(req,res)=>{
    const user= req.user;

  const data= await connectionRequest.find({
    toUserId:user._id,
    status:"interesed"
  }).populate("fromUserId","firstName lastName")
  console.log(data)
  res.json({message:"recieved requests from ",connections:data,})
})

userRouter.get("/user/request/connections",Userauth,async(req,res)=>{
  const loggedInUser=req.user

  const data= await connectionRequest.find({
    $or:[{toUserId:loggedInUser,status:"accepted"},{fromUserId:loggedInUser,status:"accepted"}]
  }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName")
  console.log(data)
  const requests= data.map((row)=>{
    if( row.fromUserId._id.toString()=== loggedInUser._id.toString()){
      return row.toUserId
    } 
    return row.fromUserId
  })
 res.json(requests)
})

userRouter.get("/user/feed",Userauth,async(req,res)=>{
  const loggedInUser= req.user;
  const page= parseInt(req.query.page) || 1
  let limit= parseInt(req.query.limit)  || 10;

  limit = limit>50? 50 : limit;
  const skip = (page-1)*limit;
  
  const requests= await connectionRequest.find({
    $or:[{fromUserId:loggedInUser},{toUserId:loggedInUser}]
  }).select( "fromUserId toUserId")
  const uniqueData= new Set();
requests.forEach((val)=>{
   uniqueData.add(val.fromUserId.toString())
   uniqueData.add(val.toUserId.toString())
  }
)
const feedUsers=await Users.find({
  $and:[
    {_id:{$nin:Array.from(uniqueData)}},
    {_id:{$ne:loggedInUser._id}}
  ]
}).select(USER_SAFE_DATA)
  .skip(skip)
  .limit(limit)
res.send(feedUsers)

})

module.exports=userRouter