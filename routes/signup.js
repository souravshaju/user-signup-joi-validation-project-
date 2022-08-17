//requiring express,db,joischema
const express=require("express")
const router = express()
const db=require("../connection")
const joischema=require("../helper/joi")

//signing up with joi validation
router.post("/signup",(req,res)=>{
    let signup=req.body
    let dataToValidate={
        username:req.body.username,
        password:req.body.password,
        birthyear:req.body.birthyear,
        email:req.body.email
    }
    const result = joischema.validate(dataToValidate,joischema.schema);
    console.log(result)
    if(result.error==null){
        let insert=`insert into signup(email,password,username,birthyear)
    values('${signup.email}','${signup.password}','${signup.username}',${signup.birthyear})`
    db.query(insert,(err,result)=>{
        if(!err){
            console.log("success")
            res.status(200)
        }else{
            console.log("data insertion failed",err)
            res.status(400)
        }
    })
    }    
})
module.exports=router