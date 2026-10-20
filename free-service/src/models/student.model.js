const debts = new Map([
  [1, 50_000_000],
  [2, 0],
  [3, 3_200_000],
]);

module.exports = {
  exists: (id) => debts.has(id),
  getDebt: (id) => debts.get(id),
  decreaseDebt: (id, amount) => debts.set(id, debts.get(id) - amount),
};
