const paymentService = require("../services/payment.service");

exports.create = async (req, res, next) => {
  try {
    const result = await paymentService.pay(
      Number(req.params.id),
      req.body?.amount,
    );
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
