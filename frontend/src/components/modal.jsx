import React, { Component } from "react";
import moment from "moment";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.categoryList = [
      { categoryID: "", category: "Select" },
      { categoryID: "FL", category: "Food" },
      { categoryID: "SH", category: "Shopping" },
      { categoryID: "TS", category: "Transport" },
      { categoryID: "HL", category: "HealthCare" },
      { categoryID: "HS", category: "Housing" },
      { categoryID: "LP", category: "Loan Payment" },
      { categoryID: "OTR", category: "Others" }
    ];
    this.selectedOptions = {
      year: "",
      month: "",
      categoryID: "",
      amount: ""
    };
  }

  getModalBody = () => {
    const { activeExpense, editExpenseItem, editExpenseFlag } = this.props;
    const yearsList = this.getYearsList();
    return (
      <>
        <div className="group-item">
          <label htmlFor="yearsDDL">Year:</label>
          <select
            id="yearsDDL"
            onChange={e => this.handleChange(e, "year")}
            defaultValue={editExpenseFlag && activeExpense.year}
          >
            {yearsList.map(option => (
              <option className="select-options" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="group-item">
          <label htmlFor="monthsDDL">Month:</label>
          <select
            id="monthsDDL"
            onChange={e => this.handleChange(e, "month")}
            defaultValue={
              editExpenseFlag &&
              moment()
                .month(activeExpense.month - 1)
                .format("MMMM")
            }
          >
            <option className="select-options" value="">
              {"Select"}
            </option>
            {moment.months().map(item => (
              <option className="select-options" key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="group-item">
          <label htmlFor="categoryDDL">Category:</label>
          <select
            id="categoryDDL"
            onChange={e => this.handleChange(e, "categoryID")}
            defaultValue={editExpenseFlag && editExpenseItem.categoryId}
          >
            {this.categoryList.map(item => (
              <option
                className="select-options"
                key={item.categoryID}
                value={item.categoryID}
              >
                {item.category}
              </option>
            ))}
          </select>
        </div>
        <div className="group-item">
          <label>Paid:</label>
          <input
            className="amount-field"
            type="text"
            maxLength="6"
            name="amount"
            onChange={e => this.handleChange(e, "amount")}
            placeholder="0.0$"
            defaultValue={editExpenseFlag ? editExpenseItem.amount : ""}
          ></input>
        </div>
      </>
    );
  };

  getModalHeader = header => {
    return (
      <>
        <label className="header-text">{header.text}</label>
        <div
          className="close-icon-wrapper"
          onClick={() => this.props.closeModal()}
        >
          <i className="fa fa-times fa-2x" aria-hidden="true"></i>
        </div>
      </>
    );
  };
  getModalFooter = footer => {
    return (
      <>
        <button
          className="primary-btn"
          onClick={() => this.props.submitExpense(this.selectedOptions)}
        >
          {footer.buttonText}
        </button>
        <button className="cancel-btn" onClick={() => this.props.closeModal()}>
          Cancel
        </button>
      </>
    );
  };
  getYearsList = () => {
    const start = moment().subtract(20, "years");
    const end = moment().add(20, "years");
    const diffYears = moment(end).diff(start, "years");
    let yearsBetween = ["Select"];
    for (let i = 0; i <= diffYears; i++) {
      yearsBetween.push(moment(start).year() + i);
    }
    return yearsBetween;
  };

  handleChange = (e, type) => {
    this.selectedOptions[type] = e.target.value;
  };
  render() {
    const { header, footer, editExpenseItem } = this.props;

    console.log(editExpenseItem);
    return (
      <>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">{this.getModalHeader(header)}</div>
            <div className="modal-body">{this.getModalBody()}</div>
            <div className="modal-footer">{this.getModalFooter(footer)}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
