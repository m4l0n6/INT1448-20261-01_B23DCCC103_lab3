const Student = require("../models/student.model");
const Payment = require("../models/payment.model");
const bankClient = require("./bank.client");
const AppError = require("../errors/app-error");

async function pay(studentId, amount) {
  if (!Student.exists(studentId)) throw new AppError(404, "student not found");
  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    amount > Student.getDebt(studentId)
  )
    throw new AppError(400, "invalid amount");

  const payment = Payment.create({ studentId, amount });
  const { paymentId } = payment;

  try {
    const { status, body } = await bankClient.charge({
      reference: paymentId,
      amount,
      idempotencyKey: paymentId,
    });

    if (status === 201) {
      Student.decreaseDebt(studentId, amount); // chỉ giảm khi ngân hàng đã trừ
      Payment.updateStatus(paymentId, "PAID");
      return { paymentId, status: "PAID", chargeId: body.chargeId };
    }

    Payment.updateStatus(paymentId, "FAILED");
    throw new AppError(status, body.error, { paymentId, status: "FAILED" });
  } catch (e) {
    if (e instanceof AppError) throw e;
    // TODO (TH1/2/4): phân biệt 503 (chưa kết nối được) và 504 (không biết)
    Payment.updateStatus(paymentId, "FAILED");
    throw new AppError(503, "bank unavailable", {
      paymentId,
      status: "FAILED",
    });
  }
}

function getFees(studentId) {
  if (!Student.exists(studentId)) throw new AppError(404, "student not found");
  return { studentId, debt: Student.getDebt(studentId) };
}

module.exports = { pay, getFees };
