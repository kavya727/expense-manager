import React, { Component } from "react";
import orderBy from "lodash/orderBy";
import get from "lodash/get";
import filter from "lodash/filter";
import Months from "./monthsList";
import ExpenseList from "./expenseList";
import Modal from "./modal";
import {
  getExpenses,
  getCategoryList,
  updateExpenseList,
  deleteExpenses
} from "../services/expensesService";
import "../App.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseList: [],
      activeExpense: {},
      activeClass: "",
      showModal: false,
      editExpense: false,
      editExpenseItem: {}
    };
  }

  async componentWillMount() {
    this.expenseList = await getExpenses();
    const categoryList = await getCategoryList();
    const expenseList = orderBy(this.expenseList.data, "month", "desc");
    this.setState({
      expenseList,
      activeExpense: expenseList[0],
      activeClass: "active-month",
      categoryList: categoryList.data
    });
  }
  addExpense = () => {
    this.modalHeader = {
      text: "Add New Expense"
    };
    this.modalFoofer = {
      buttonText: "ADD"
    };
    this.setState({ showModal: true });
  };

  submitExpense = async payload => {
    console.log("req", payload);
    let result = {};
    let reqPayload;
    const items = [];
    const selectedCategory = filter(this.state.categoryList, option => {
      return option.categoryID === payload.categoryID;
    });
    items.push({
      _id: this.state.editExpenseFlag ? this.state.editExpenseItem._id : null,
      itemid: this.state.editExpenseFlag
        ? `${payload.categoryID}${this.state.editExpenseItem.itemid.slice(2)}`
        : `${payload.categoryID}${this.state.activeExpense.items.length + 1}`,
      amount: payload.amount,
      category: selectedCategory[0].category,
      iconClass: selectedCategory[0].iconClass,
      categoryID: selectedCategory[0].categoryID
    });
    reqPayload = {
      _id: this.state.activeExpense._id,
      items
    };
    if (reqPayload) {
      console.log("reqpayload", reqPayload);
      result = await updateExpenseList(reqPayload);
      console.log("result", result);
    }
    this.expenseList = await getExpenses();
    const expenseList = orderBy(this.expenseList.data, "month", "desc");
    if (result) {
      this.setState({
        editExpenseItem: {},
        editExpenseFlag: false,
        showModal: false,
        activeExpense: result.data,
        expenseList
      });
    }
  };

  closeModal = () => {
    this.setState({
      editExpenseFlag: false,
      editExpenseItem: {},
      showModal: false
    });
  };

  deleteExpense = async item => {
    console.log("delete", item);
    const req = {
      _id: this.state.activeExpense._id,
      items: { _id: item._id }
    };
    console.log("delete req", req);
    const result = await deleteExpenses(req);
    if (result.data) {
      this.expenseList = await getExpenses();
      const expenseList = orderBy(this.expenseList.data, "month", "desc");
      if (result) {
        this.setState({
          expenseList,
          activeExpense: result.data
        });
      }
    }
  };

  editExpense = item => {
    this.modalHeader = {
      text: "Edit Expense"
    };
    this.modalFoofer = {
      buttonText: "EDIT"
    };
    this.setState({
      editExpenseItem: item,
      showModal: true,
      editExpenseFlag: true
    });
  };

  getActiveMonthlyExpense = item => {
    console.log(item);
    this.setState({ activeExpense: item, activeClass: "active-month" });
  };

  getTotal = activeExpense => {
    let total = 0;
    if (get(activeExpense, "items")) {
      const items = activeExpense.items;

      items.map(item => (total = total + item.amount));
    }
    return total;
  };

  render() {
    return (
      <>
        <div className="main-container">
          <>
            {this.state.expenseList.length > 0 ? (
              <>
                <span className="total-amaount">
                  You Spent: ${this.getTotal(this.state.activeExpense)}
                </span>
                <Months
                  expenseList={this.state.expenseList}
                  getActiveMonthlyExpense={this.getActiveMonthlyExpense}
                  activeClass={this.state.activeClass}
                  activeExpense={this.state.activeExpense}
                />
                <ExpenseList
                  activeExpense={this.state.activeExpense}
                  editExpense={this.editExpense}
                  deleteExpense={this.deleteExpense}
                />
                <div className="icon-wrapper" onClick={() => this.addExpense()}>
                  <i
                    className="fa fa-plus add-expense-icon fa-2x"
                    aria-hidden="true"
                  ></i>
                </div>
                {this.state.showModal ? (
                  <Modal
                    header={this.modalHeader}
                    footer={this.modalFoofer}
                    closeModal={this.closeModal}
                    submitExpense={this.submitExpense}
                    editExpenseItem={this.state.editExpenseItem}
                    activeExpense={this.state.activeExpense}
                    editExpenseFlag={this.state.editExpenseFlag}
                    categoryList={this.state.categoryList}
                  />
                ) : null}
              </>
            ) : (
              <h2>Loading.....</h2>
            )}
          </>
        </div>
      </>
    );
  }
}

export default Dashboard;
