const chargeService = require("../services/charge.service");

exports.create = (req, res, next) => {
  try {
    const { reference, amount } = req.body;
    const { charge, replayed } = chargeService.charge({
      reference,
      amount,
      idempotencyKey: req.get("Idempotency-Key"),
    });

    if (!replayed && res.locals.drop) return req.socket.destroy();

    res.status(201).json(charge);
  } catch (e) {
    next(e);
  }
};
