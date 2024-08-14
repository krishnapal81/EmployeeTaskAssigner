let mongoose=require("mongoose")
let tasksch=new mongoose.Schema({
    "_id":String,
    "description":String,
    "eid":String,
    "status":String
})
module.exports=mongoose.model("task",tasksch)