module.exports = {
  port: Number(process.env.PORT || 4002),
  delayMs: Number(process.env.DELAY_MS || 0),
  failRate: Number(process.env.FAIL_RATE || 0),
  dropRate: Number(process.env.DROP_RATE || 0),
  chargeLimit: 20_000_000,
  keepAliveTimeout: 5000,
};
