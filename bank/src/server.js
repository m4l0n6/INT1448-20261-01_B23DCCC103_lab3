const http = require("http");
const app = require("./app");
const Charge = require("./models/charge.model");
const config = require("./config");

const server = http.createServer(app);
server.keepAliveTimeout = config.keepAliveTimeout;

server.on("connection", () => {
  const n = Charge.countConnection();
  console.log(`[bank] new TCP connection #${n}`);
});

server.listen(config.port, () => {
  console.log(
    `Bank on :${config.port} | DELAY=${config.delayMs} FAIL=${config.failRate} DROP=${config.dropRate}`,
  );
  console.log(`Docs: http://localhost:${config.port}/docs`);
});