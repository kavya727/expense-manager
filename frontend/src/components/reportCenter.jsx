import React, { Component } from "react";
import { select, csv, scaleLinear, max, scaleBand } from "d3";
import orderBy from "lodash/orderBy";
import { getExpenses } from "../services/expensesService";

class Reports extends Component {
  state = {};

  async componentDidMount() {
    this.activeExpense = this.props.location.state.activeExpense;
    console.log("props", this.activeExpense);
    this.setState({
      activeExpense: this.activeExpense
    });
  }
  getGrapgh = data => {
    const svg = select("svg");
    if (svg && data) {
      const width = "960"; // +svg.attr("width");
      const height = "50"; // +svg.attr("height");
      data.forEach((item, index) => {
        item.index = index * height;
      });

      console.log("data", data);
      const xScale = scaleLinear()
        .domain([0, max(data, d => d.amount)])
        .range([0, width]);

      const yScale = scaleBand()
        .domain([data.map(d => d.category)])
        .range([0, height]);

      console.log(yScale.range());

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", d => xScale(d.amount))
        .attr("height", yScale.bandwidth())
        .attr("y", d => d.index)
        .attr("fill", "#8c8787")
        .attr("className", "rect-class");

      console.log("y", yScale("Housing"));
    }
  };

  render() {
    return (
      <>
        <div className="reportContainer">
          <h1 className="header-text">Report Center</h1>
          <svg width="960" height="500" className="svg-class"></svg>
          {this.state.activeExpense
            ? this.getGrapgh(this.state.activeExpense.items)
            : null}
        </div>
      </>
    );
  }
}

export default Reports;
