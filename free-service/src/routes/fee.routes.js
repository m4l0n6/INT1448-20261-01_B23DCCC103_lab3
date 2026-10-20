const router = require("express").Router();
const ctrl = require("../controllers/fee.controller");

router.get("/:id/fees", ctrl.getFees);
module.exports = router;
