const express = require('express')
const { departmentController} =require('../controller')

// const authMiddleware = require('./middleware')
const router=express.Router()

// router.use(authMiddleware)
router.get('/selectDepartment',departmentController.selectDepartment)
router.post('/insertDepartment',departmentController.insertDepartment)
router.put('/editDepartment',departmentController.editDepartment)

module.exports = router