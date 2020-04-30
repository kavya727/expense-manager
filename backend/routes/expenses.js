const { Expenses } = require("../models/expenses");
const { Categories } = require("../models/categories");
const express = require("express");
const router = express();

//To fetch all categories
router.get("/categories", async (req, res) => {
  const categories = await Categories.find()
    .select("-__v")
    .sort({ category: 1 });
  // console.log("Categories from db...", categories);
  res.send(categories);
});

//To fetch all expenses
router.get("/expenses", async (req, res) => {
  const expenses = await Expenses.find()
    .select("-__v")
    .sort("year");
  // console.log("Expenses from db...", expenses);
  res.send(expenses);
});

//To add/update expense into active year and month expense list
router.put("/expenses", async (req, res) => {
  const expense = await Expenses.findById(req.body._id);
  console.log("expense update", req.body);
  if (!expense) return;
  if (req.body.items[0]._id === null) {
    const item = req.body.items[0];
    expense.items.push({
      itemid: item.itemid,
      category: item.category,
      categoryID: item.categoryID,
      iconClass: item.iconClass,
      amount: item.amount
    });
    const result = await expense.save();
    console.log("item added..", result);
    res.send(result);
  } else {
    //To modify using any update methods instead of pull and push
    const itemRemoved = expense.items.pull({ _id: req.body.items[0]._id });
    if (itemRemoved) {
      expense.items.push(req.body.items[0]);
      const result = await expense.save();
      console.log("item edit..", result);
      res.send(result);
    }
  }
});

// router.delete("/expenses", async (req, res) => {
//   console.log("req", req.body);
//   const expense = await Expenses.findById(req.body._id);
//   if (!expense) return;
//   const result = expense.items.pull({ _id: req.body.items[0]._id });
//   res.send(result);
// });

router.put("/expensesDelete", async (req, res) => {
  const expense = await Expenses.findById(req.body._id);
  expense.items.pull({ _id: req.body.items._id });
  const result = await expense.save();
  if (!result) return;
  console.log(result);
  res.send(result);
});

module.exports = router;
