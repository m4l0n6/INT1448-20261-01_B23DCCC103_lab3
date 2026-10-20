const Charge = require("../models/charge.model");

exports.countRequest = (req, res, next) => {
  Charge.countRequest();
  next();
};
