import React, { Component } from "react";
import get from "lodash/get";
import cn from "classnames";

class ExpenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getExpenses = expense => {
    let expenseItems = [];
    if (get(expense, "items")) {
      const items = expense.items;
      expenseItems = items.map((item, index) => (
        <>
          <tbody>
            <tr className="table-row" key={`table-row+${index}`}>
              <td className="expense-icon" key={`expense-icon+${index}`}>
                <div className="icon-wrapper">
                  <i className={cn(item.iconClass, "fa-lg")}></i>
                </div>
              </td>
              <td key={`expense-label+${index}`} className="expense-label">
                {item.category}
              </td>
              <td key={`expense-price+${index}`} className="expense-price">
                ${item.amount}
              </td>
              <td
                key={`edit-expense-icon+${index}`}
                className="edit-expense-icon"
              >
                <div
                  className="icon-wrapper"
                  onClick={() => this.props.editExpense(item)}
                >
                  <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                </div>
              </td>
              <td
                key={`remove-expense-icon+${index}`}
                className="remove-expense-icon"
              >
                <div
                  className="icon-wrapper"
                  onClick={() => this.props.deleteExpense(item)}
                >
                  <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </>
      ));
    }
    return expenseItems;
  };

  render() {
    const { activeExpense } = this.props;
    console.log(activeExpense);
    return (
      <>
        <table className="expenses-table">
          {this.getExpenses(activeExpense)}
        </table>
      </>
    );
  }
}

export default ExpenseList;
