const express = require('express')
const { designationController} =require('../controller')

// const authMiddleware = require('./middleware')
const router=express.Router()

// router.use(authMiddleware)
router.get('/selectDesignation',designationController.selectDesignation)
router.post('/insertDesignation',designationController.insertDesignation)
router.put('/editDesignation',designationController.editDesignation)

module.exports = router