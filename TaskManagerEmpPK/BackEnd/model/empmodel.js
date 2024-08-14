let mongoose=require("mongoose")
let empsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "dept":String
})
module.exports=mongoose.model("emp",empsch)