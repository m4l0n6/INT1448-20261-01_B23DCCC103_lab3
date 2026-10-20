const AppError = require("../errors/app-error");

exports.validateCharge = (req, res, next) => {
  const { reference, amount } = req.body || {};
  if (!reference || !Number.isFinite(amount) || amount <= 0)
    return next(new AppError(400, "invalid amount"));
  next();
};
