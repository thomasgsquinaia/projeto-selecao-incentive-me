const express = require("express")
const router = express.Router();
const paymentsController = require("../controllers/payments")

router.post("/", paymentsController.create);
router.get("/", paymentsController.get);
router.get("/:id", paymentsController.getById);
router.put("/", paymentsController.update);
router.delete("/:id", paymentsController.delete);

module.exports = router;