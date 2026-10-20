const payments = new Map();
let seq = 0;

module.exports = {
  create({ studentId, amount }) {
    const paymentId = "P" + ++seq;
    const payment = { paymentId, studentId, amount, status: "PENDING" };
    payments.set(paymentId, payment);
    return payment;
  },
  updateStatus(paymentId, status) {
    payments.get(paymentId).status = status;
  },
  findById: (paymentId) => payments.get(paymentId),
};
