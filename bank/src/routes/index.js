const router = require("express").Router();
const { countRequest } = require("../middlewares/metrics.middleware");
const { validateCharge } = require("../middlewares/validate.middleware");
const chaos = require("../middlewares/chaos.middleware");
const chargeCtrl = require("../controllers/charge.controller");
const statsCtrl = require("../controllers/stats.controller");

router.post(
  "/charges",
  countRequest,
  validateCharge,
  ...chaos,
  chargeCtrl.create,
);
router.get("/stats", statsCtrl.get);

module.exports = router;
