const express =require ('express')
const router=express.Router()
const authRouter=require('./route.authentication')
const adminRouter=require('./route.admin')
const departmentRouter=require('./route.department')
const designationRouter=require('./route.designation')
const employeeRouter=require('./route.employee')
// const authMiddleware=require('../middleware/middleware.authorization')

// router.use(authMiddleware)

router.use('/auth',authRouter)
router.use('/admin',adminRouter)
router.use('/department',departmentRouter)
router.use('/designation',designationRouter)
router.use('/employee',employeeRouter)

module.exports=router
