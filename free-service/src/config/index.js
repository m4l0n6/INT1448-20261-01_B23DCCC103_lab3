module.exports = {
  port: Number(process.env.PORT || 4001),
  bankUrl: process.env.BANK_URL || "http://localhost:4002",
};
