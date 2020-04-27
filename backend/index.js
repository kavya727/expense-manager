const express = require("express");
const config = require("config");
const app = express();

require("./settings/cors")(app);
require("./settings/routes")(app);
require("./settings/db")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
