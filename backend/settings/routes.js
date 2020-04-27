const express = require("express");
const expenses = require("../routes/expenses");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api", expenses);
};
