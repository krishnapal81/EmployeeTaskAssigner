let mongoose=require("mongoose")
let admsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String
})
module.exports=mongoose.model("admin",admsch)