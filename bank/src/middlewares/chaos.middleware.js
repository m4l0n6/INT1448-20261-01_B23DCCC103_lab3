const { delayMs, failRate, dropRate } = require("../config");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const delay = async (req, res, next) => {
  if (delayMs) await sleep(delayMs);
  next();
};

const fail = (req, res, next) => {
  if (Math.random() < failRate)
    return res.status(500).json({ error: "temporary failure" });
  next();
};

const markDrop = (req, res, next) => {
  res.locals.drop = Math.random() < dropRate;
  next();
};

module.exports = [delay, fail, markDrop];
