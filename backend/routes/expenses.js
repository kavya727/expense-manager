const { Expenses } = require("../models/expenses");
const express = require("express");
const router = express();

// const expenses = [
//   {
//     id: 11,
//     year: 2019,
//     month: 12,
//     items: [
//       {
//         itemid: "FL1",
//         category: "food",
//         categoryId: "FL",
//         amount: 45,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS1",
//         category: "housing",
//         categoryId: "HS",
//         amount: 450,
//         iconClass: "fa fa-home"
//       },
//       {
//         itemid: "HL1",
//         category: "healthcare",
//         categoryId: "HL",
//         amount: 88,
//         iconClass: "fa fa-heartbeat"
//       },
//       {
//         itemid: "LP1",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       },
//       {
//         itemid: "TS1",
//         category: "Transport",
//         categoryId: "TS",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "SH1",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       }
//     ]
//   },
//   {
//     id: 12,
//     year: 2019,
//     month: 2,
//     items: [
//       {
//         itemid: "FL2",
//         category: "food",
//         categoryId: "FL",
//         amount: 72,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS2",
//         category: "housing",
//         categoryId: "HS",
//         amount: 450,
//         iconClass: "fa fa-home"
//       },
//       {
//         itemid: "HL2",
//         category: "healthcare",
//         amount: 76,
//         categoryId: "HL",
//         iconClass: "fa fa-heartbeat"
//       },
//       {
//         itemid: "LP2",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       },
//       {
//         itemid: "TS2",
//         category: "Transport",
//         categoryId: "TS",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "SH2",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       }
//     ]
//   },
//   {
//     id: 72,
//     year: 2019,
//     month: 1,
//     items: [
//       {
//         itemid: "FL3",
//         category: "food",
//         categoryId: "FL",
//         amount: 78,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS3",
//         category: "housing",
//         categoryId: "HS",
//         amount: 450,
//         iconClass: "fa fa-home"
//       },
//       {
//         itemid: "HL3",
//         category: "healthcare",
//         categoryId: "HL",
//         amount: 32,
//         iconClass: "fa fa-heartbeat"
//       },
//       {
//         itemid: "TS3",
//         category: "Transport",
//         categoryId: "TS",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "LP3",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       },
//       {
//         itemid: "SH3",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       }
//     ]
//   },
//   {
//     id: 23,
//     year: 2019,
//     month: 3,
//     items: [
//       {
//         itemid: "FL3",
//         category: "food",
//         categoryId: "FL",
//         amount: 78,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS3",
//         category: "housing",
//         categoryId: "HS",
//         amount: 450,
//         iconClass: "fa fa-home"
//       },
//       {
//         itemid: "HL3",
//         category: "healthcare",
//         categoryId: "HL",
//         amount: 32,
//         iconClass: "fa fa-heartbeat"
//       },
//       {
//         itemid: "TS3",
//         category: "Transport",
//         categoryId: "TS",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "LP3",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       },
//       {
//         itemid: "SH3",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       }
//     ]
//   },
//   {
//     id: 14,
//     year: 2019,
//     month: 7,
//     items: [
//       {
//         itemid: "FL4",
//         category: "food",
//         categoryId: "FL",
//         amount: 67,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS4",
//         category: "housing",
//         categoryId: "HS",
//         amount: 450,
//         iconClass: "fa fa-home"
//       },
//       {
//         itemid: "HL4",
//         category: "healthcare",
//         categoryId: "HL",
//         amount: 97,
//         iconClass: "fa fa-heartbeat"
//       },
//       {
//         itemid: "TS4",
//         category: "Transport",
//         categoryId: "TS",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "LP4",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       },
//       {
//         itemid: "SH4",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       }
//     ]
//   },
//   {
//     id: 15,
//     year: 2019,
//     month: 4,
//     items: [
//       {
//         itemid: "FL5",
//         category: "food",
//         categoryId: "FL",
//         amount: 56,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS5",
//         category: "housing",
//         categoryId: "HS",
//         amount: 450,
//         iconClass: "fa fa-home"
//       },
//       {
//         itemid: "HL5",
//         category: "healthcare",
//         categoryId: "HL",
//         amount: 87,
//         iconClass: "fa fa-heartbeat"
//       },
//       {
//         itemid: "TS5",
//         category: "Transport",
//         categoryId: "TS",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "SH5",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       },
//       {
//         itemid: "LP5",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       }
//     ]
//   },
//   {
//     id: 16,
//     year: 2019,
//     month: 6,
//     items: [
//       {
//         itemid: "FL7",
//         category: "food",
//         categoryId: "FL",
//         amount: 34,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS7",
//         category: "housing",
//         categoryId: "HS",
//         amount: 450,
//         iconClass: "fa fa-home"
//       },
//       {
//         itemid: "HL7",
//         category: "healthcare",
//         categoryId: "HL",
//         amount: 62,
//         iconClass: "fa fa-heartbeat"
//       },
//       {
//         itemid: "TS7",
//         category: "Transport",
//         categoryId: "TS",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "LP7",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       },
//       {
//         itemid: "SH7",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       }
//     ]
//   },
//   {
//     id: 17,
//     year: 2019,
//     month: 9,
//     items: [
//       {
//         itemid: "FL8",
//         category: "food",
//         categoryId: "FL",
//         amount: 88,
//         iconClass: "fa fa-cutlery"
//       },
//       {
//         itemid: "HS8",
//         category: "housing",
//         amount: 450,
//         iconClass: "fa fa-home",
//         categoryId: "HS"
//       },
//       {
//         itemid: "HL8",
//         category: "healthcare",
//         amount: 66,
//         iconClass: "fa fa-heartbeat",
//         categoryId: "HL"
//       },
//       {
//         itemid: "LP8",
//         category: "Loan Payment",
//         categoryId: "LP",
//         amount: 160,
//         iconClass: "fa fa-credit-card"
//       },
//       {
//         itemid: "TS8",
//         category: "Transport",
//         amount: 160,
//         iconClass: "fa fa-taxi"
//       },
//       {
//         itemid: "SH8",
//         category: "Shopping",
//         amount: 160,
//         iconClass: "fa fa-shopping-bag",
//         categoryId: "SH"
//       }
//     ]
//   }
// ];

router.get("/expenses", async (req, res) => {
  const expenses = await Expenses.find()
    .select("-__v")
    .sort("year");
  console.log("Expenses from db...", expenses);
  res.send(expenses);
});

module.exports = router;
