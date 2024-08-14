let emp=require('../model/empmodel')
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")


let addemp=async(req,res)=>{
    try{
       let hashcode= await bcrypt.hash(req.body.pwd,10)
       let data=new emp({...req.body,"pwd":hashcode}) 
       await data.save()
       res.json({"msg":"emp account created"})
    }
    catch(err)
    {
        console.log(err)
    }
}

let emplogin=async(req,res)=>{
    try{
        let obj= await emp.findById({"_id":req.body._id})
        if(obj)
            {
                let f=await bcrypt.compare(req.body.pwd,obj.pwd)
                if(f){
                    res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"_id":obj._id,"name":obj.name,"isadmin":false})
                }
                else{
                    res.json({"msg":"check emp pwd"})
                }
            }
            else{
                res.json({"msg":"check emp Id"})
            }
    }
    catch(err)
    {
        console.log(err)
    }
}
let getdept=async(req,res)=>{
    let data=await emp.find({},{"dept":1,"_id":0})
    let dept=[]
    for(let i=0;i<data.length;i++)
        {
            if(!dept.includes(data[i].dept))
                {
                    dept.push(data[i].dept)
                }
        }
        res.json(dept)
}
 let getemp=async(req,res)=>{
    let data=await emp.find({"dept":req.params.dept},{"_id":1})
    let emps=[]
    for(let i=0;i<data.length;i++)
        {
            emps.push(data[i]._id)
        }
        res.json(emps)
 }
 let resetpwd=async(req,res)=>{
    let hashcode= await bcrypt.hash(req.body.pwd,10)
    await emp.findByIdAndUpdate({"_id":req.body._id},{"pwd":hashcode})
    res.json({"msg":"reset pwd process is done"})
 }

module.exports={addemp,emplogin,getdept,getemp,resetpwd}