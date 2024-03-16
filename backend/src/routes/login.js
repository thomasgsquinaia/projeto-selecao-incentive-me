const express = require("express")
const router = express.Router();
const loginController = require("../controllers/login")

router.post("/", loginController.loginUser);
router.post('/addFirstUser', loginController.addFirstUser);

module.exports = router;