const app = require("./app");
const { port } = require("./config");

app.listen(port, () => console.log(`Fee Service on :${port}, docs at /docs`));
