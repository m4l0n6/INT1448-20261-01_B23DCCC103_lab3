const AppError = require("../errors/app-error");

module.exports = (err, req, res, next) => {
  if (err instanceof AppError)
    return res.status(err.status).json({ error: err.message, ...err.extra });
  console.error(err);
  res.status(500).json({ error: "internal error" });
};
