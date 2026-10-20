const express = require("express");
const routes = require("./routes");
const swagger = require("./docs/swagger");
const errorHandler = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());
app.use("/docs", ...swagger);
app.use("/", routes);
app.use(errorHandler);

module.exports = app;
