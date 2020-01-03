const express =require ('express')
const router=express.Router()
const authRouter=require('./route.authentication')
const adminRouter=require('./route.admin')

router.use('/auth',authRouter)
router.use('/admin',adminRouter)


module.exports=router
