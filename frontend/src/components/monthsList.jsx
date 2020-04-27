import React, { Component } from "react";
import moment from "moment";
import cn from "classnames";

class MonthsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getMonth = month => {
    return moment.monthsShort(month - 1);
  };

  render() {
    const { expenseList, activeClass, activeExpense } = this.props;
    console.log("months jsx", expenseList);
    return (
      <>
        <div className="months-container">
          {expenseList.map((item, index) => (
            <div
              key={index}
              className={cn(
                item.id === activeExpense.id ? activeClass : "",
                "months-box"
              )}
              onClick={() => this.props.getActiveMonthlyExpense(item)}
            >
              {this.getMonth(item.month)}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default MonthsList;
