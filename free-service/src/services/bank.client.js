const { bankUrl } = require("../config");

async function charge({ reference, amount, idempotencyKey }) {
  const res = await fetch(`${bankUrl}/charges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ reference, amount }),
  });
  return { status: res.status, body: await res.json() };
}

module.exports = { charge };
