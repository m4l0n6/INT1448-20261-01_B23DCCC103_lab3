const stats = { connections: 0, requests: 0, charges: 0, duplicates: 0 };
const byKey = new Map();
const chargedRefs = new Set();
let seq = 0;

module.exports = {
  stats,
  countConnection: () => ++stats.connections,
  countRequest: () => ++stats.requests,
  findByKey: (key) => byKey.get(key),

  create({ reference, amount, idempotencyKey }) {
    const charge = { chargeId: "C" + ++seq, reference, amount };
    stats.charges++;
    if (chargedRefs.has(reference)) stats.duplicates++;
    chargedRefs.add(reference);
    if (idempotencyKey) byKey.set(idempotencyKey, charge);
    return charge;
  },
};
