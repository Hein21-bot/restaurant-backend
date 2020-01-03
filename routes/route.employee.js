const express = require('express')
const { employeeController} =require('../controller')

// const authMiddleware = require('./middleware')
const router=express.Router()

// router.use(authMiddleware)
router.get('/selectEmployee',employeeController.selectEmployee)
router.post('/insertEmployee',employeeController.insertEmployee)
router.put('/editEmployee',employeeController.editEmployee)

module.exports = router