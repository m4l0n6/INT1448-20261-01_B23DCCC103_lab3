const paymentService = require("../services/payment.service");

exports.getFees = (req, res, next) => {
  try {
    res.json(paymentService.getFees(Number(req.params.id)));
  } catch (e) {
    next(e);
  }
};
