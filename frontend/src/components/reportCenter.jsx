import React, { Component } from "react";
import { select, csv, scaleLinear, max, scaleBand } from "d3";
import orderBy from "lodash/orderBy";
import { getExpenses } from "../services/expensesService";

class Reports extends Component {
  state = {};

  async componentWillMount() {
    this.activeExpense = this.props.location.state.activeExpense;
    console.log("props", this.activeExpense);
    this.setState({
      activeExpense: this.activeExpense
    });
  }
  getGrapgh = data => {
    const svg = select("svg");
    if (svg) {
      const width = +svg.attr("width");
      const height = +svg.attr("height");

      //   const xValue = d => d.amount;
      //   const yValue = d => d.category;

      console.log("data", data);
      const xScale = scaleLinear()
        .domain([0, max(data, d => d.amount)])
        .range([0, width]);

      const yScale = scaleBand()
        .domain([data.map(d => d.category)])
        .range([0, height]);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => yScale(d.category))
        .attr("width", d => xScale(d.amount))
        .attr("height", yScale.bandwidth());
    }
  };

  render() {
    return (
      <>
        <h1>Report Center</h1>
        <svg width="960" height="500"></svg>
        {/* {this.state.activeExpense
          ? this.getGrapgh(this.state.activeExpense.items)
          : null} */}
      </>
    );
  }
}

export default Reports;
