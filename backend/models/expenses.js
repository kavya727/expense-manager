const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Expenses = mongoose.model(
  "Expenses",
  new mongoose.Schema({
    year: Number,
    month: Number,
    items: [
      {
        itemid: String,
        category: String,
        categoryID: String,
        amount: Number,
        iconClass: String
      }
    ]
  })
);

exports.Expenses = Expenses;
