const express = require("express");
const { departmentController } = require("../controller");
const { adminController } = require("../controller");

// const authMiddleware = require('./middleware')
const router = express.Router();
const { navController } = require("../controller");

// router.use(authMiddleware)
router.get("/nav", navController.navBarInfo);

router.get("/selectRole", adminController.selectRole);

router.post("/insertRole", adminController.insertRole);

router.put("/editRole", adminController.editRole);

module.exports = router;
