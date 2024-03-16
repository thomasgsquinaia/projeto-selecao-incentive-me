const { Router } = require("express");
const login = require("./login");
const payments = require("./payments");
const balance = require("./balance");
const router = Router();
router.use("/login", login);
router.use("/payments", payments);
router.use("/balance", balance);
module.exports = router;