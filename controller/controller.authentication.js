const response=require('../model/response')
const {authService}=require('../service')

const login=(req,res)=>{
  console.log(req.body);
  
   const username=req.body.userName
   const password=req.body.password
       authService.login(username,password).then(data=>{
         console.log("DATA Is====>>>",data,data.length);
         if(data.length===0){
           res.json(response({ success: false, message: "Login Fail!", payload: null }))
         }
         else {
          res.json(response({ success: true, message: "Login Success", payload: data }));
       }
       }).catch(err=>console.log(err))
}

module.exports={login}

//Functions Export with {}