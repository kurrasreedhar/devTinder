const mongoose= require("mongoose")

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
    },
    toUserId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
    },
    status:{
        type:String,
   enum:{
    values:["interesed","ignore","accepted","rejected",],
    message: `{value} is not supported`
   },
    }
}, { timestamps: true })

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save",  function (next){
    const connectionRequest= this 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send request to same id")
    }
        next()
})

const connectionRequestModel=mongoose.model("connectionRequest",connectionRequestSchema)
module.exports= connectionRequestModel