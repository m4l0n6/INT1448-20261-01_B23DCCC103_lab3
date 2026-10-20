const router = require("express").Router();
const ctrl = require("../controllers/payment.controller");

router.post("/:id/payments", ctrl.create);
module.exports = router;
