const express=require('express')
const navInfo=require('../controller')
const router=express.Router()

router.get('/nav',navInfo.navController)

module.exports=router