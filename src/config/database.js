const mongoose= require("mongoose")

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://vijaydurgasreedharkurra:Wndmem9avfULEMHS@namesthenode.b5oacmk.mongodb.net/devTinder")
}
module.exports= connectDB