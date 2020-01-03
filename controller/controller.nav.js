const response=require('../model/response')
const {adminService}=require('../service')

const navBarInfo = (req,res) => {
  
        adminService.navInfo()
        .then(data=>{
          console.log("FFFF=>>>>>",data);
          
          if(data.length===0){
            res.json(response({ success: false, message: "Nav Fail!", payload: null }))
          }
          else {
           res.json(response({ success: true, message: "Nav Success", payload: data }));
        }        })
      }
module.exports = { navBarInfo }