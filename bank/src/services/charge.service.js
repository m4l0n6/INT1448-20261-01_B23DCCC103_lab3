const Charge = require("../models/charge.model");
const AppError = require("../errors/app-error");
const { chargeLimit } = require("../config");

function charge({ reference, amount, idempotencyKey }) {

  if (idempotencyKey) {
    const old = Charge.findByKey(idempotencyKey);
    if (old) return { charge: old, replayed: true };
  }
  if (amount > chargeLimit) throw new AppError(402, "limit exceeded");

  return {
    charge: Charge.create({ reference, amount, idempotencyKey }),
    replayed: false,
  };
}

module.exports = { charge };
