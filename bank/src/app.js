const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load(path.join(__dirname, "..", "openapi.yaml"))),
);
app.use("/", routes);
app.use(errorHandler);

module.exports = app;
