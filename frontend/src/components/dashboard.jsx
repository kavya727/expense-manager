import React, { Component } from "react";
import orderBy from "lodash/orderBy";
import get from "lodash/get";
import Months from "./monthsList";
import ExpenseList from "./expenseList";
import Modal from "./modal";
import { getExpenses } from "../services/expensesService";
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
    console.log("response", this.expenseList.data);
    const expenseList = orderBy(this.expenseList.data, "month", "desc");
    this.setState({
      expenseList,
      activeExpense: expenseList[0],
      activeClass: "active-month"
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
  submitExpense = payload => {
    console.log(payload);
    this.setState({
      editExpenseItem: {},
      editExpenseFlag: false,
      showModal: false
    });
  };

  closeModal = () => {
    this.setState({
      editExpenseFlag: false,
      editExpenseItem: {},
      showModal: false
    });
  };

  deleteExpense = item => {
    console.log(item);
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
