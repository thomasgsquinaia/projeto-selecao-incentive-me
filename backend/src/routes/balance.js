const express = require("express")
const router = express.Router();
const balanceController = require("../controllers/balance")

router.post("/", balanceController.create);
router.get("/", balanceController.get);
router.put("/", balanceController.update);
router.delete("/:id", balanceController.delete);

module.exports = router;