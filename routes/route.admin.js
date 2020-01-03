const express = require('express')
const { adminController} =require('../controller')
// const authMiddleware = require('./middleware')
const router=express.Router()
const {navController}=require('../controller')

// router.use(authMiddleware)
router.get('/role',adminController.selectRole)
router.get('/nav',navController.navBarInfo)

router.post('/insertRole',adminController.insertRole)

router.put('/editRole',adminController.editRole)




module.exports = router