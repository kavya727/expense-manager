const mongoose = require("mongoose");

const Categories = mongoose.model(
  "Categories",
  new mongoose.Schema({
    category: String,
    itemid: String,
    iconClass: String
  })
);

const categorySchema = new mongoose.Schema({
  category: String,
  itemid: String,
  iconClass: String
});

exports.Categories = Categories;
