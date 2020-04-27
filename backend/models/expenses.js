const mongoose = require("mongoose");

const Expenses = mongoose.model(
  "Expenses",
  new mongoose.Schema({
    year: Number,
    month: Number,
    items: [
      {
        itemid: String,
        category: String,
        category: String,
        amount: Number,
        iconClass: String
      }
    ]
  })
);

exports.Expenses = Expenses;
