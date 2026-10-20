const router = require("express").Router();

router.use("/students", require("./fee.routes"));
router.use("/students", require("./payment.routes"));
module.exports = router;
