let admin=require("../model/adminmodel")
let bcrypt=require("bcrypt")
let jwt=require('jsonwebtoken')

let addadmin= async(req,res)=>{
    try{
        let hashcode=await bcrypt.hash(req.body.pwd,10)
        let data=new admin({...req.body,"pwd":hashcode})
        await data.save()
        res.json({"msg":"admin account created"})
    }
    catch(err)
    {
        console.log(err)
    }
}

let adminlogin=async(req,res)=>{
    try{
        let obj=await admin.findById({"_id":req.body._id})
        if(obj){
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f)
                {
                    res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"_id":obj._id,"name":obj.name,"isadmin":true})
                }
                else{
                    res.json({"msg":"check pwd"})
                }
        }
        else{
            res.json({"msg":"check admin Id"})
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

let islogin=async(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,'abcd')
        next()
    }
    catch(err)
    {
        res.json({"err":"plz login"})
    }
}

let isadmin=async(req,res,next)=>{
    try{
        let obj=await admin.findById({"_id":req.headers._id})
        if(obj){
            next()
        }
        else{
            res.json({"msg":"you are not admin"})
        }
    }
    catch(err)
    {
        console.log(err)
    }
}


module.exports={addadmin,adminlogin,isadmin,islogin}