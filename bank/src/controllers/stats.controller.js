const Charge = require("../models/charge.model");

exports.get = (req, res) => res.json(Charge.stats);
