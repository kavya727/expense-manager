import React, { Component } from "react";
import { Link } from "react-router-dom";
import { select, scaleLinear, max, scaleBand } from "d3";

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
      const width = "50"; // +svg.attr("width");
      const height = "600"; // +svg.attr("height");
      data.forEach((item, index) => {
        item.index = index * 80;
      });

      console.log("data", data);
      const xScale = scaleLinear()
        .domain([0, max(data, d => d.amount)])
        .range([0, height - 50]);

      const yScale = scaleBand()
        .domain([data.map(d => d.category)])
        .range([0, width]);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", yScale.bandwidth())
        .attr("height", d => xScale(d.amount))
        // .attr("width", d => xScale(d.amount))
        // .attr("height", yScale.bandwidth())
        .attr("x", d => d.index)
        .attr("y", d => height - xScale(d.amount))
        .attr("fill", "#8c8787")
        .attr("stroke", "black")
        .attr("className", "rect-class");

      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => d.index)
        .attr("y", d => height - xScale(d.amount) - 5)
        .text(d => d.amount)
        .attr("font-size", "medium")
        .attr("fill", "#8c8787");
      svg
        .selectAll("label")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => d.index)
        .attr("y", d => height - xScale(d.amount) - 20)
        .text(d => d.category)
        .attr("fill", "#8c8787")
        .attr("display", "flex")
        .attr("font-size", "medium");
    }
  };

  render() {
    return (
      <>
        <div className="reportContainer">
          <h1 className="header-text">Monthly Report</h1>
          <Link
            className="gobackLink"
            to={{
              pathname: "/expenses"
            }}
          >
            Go Back
          </Link>
          <span className="headertext-border"></span>
          <svg width="960" height="1000" className="svg-class"></svg>
          {this.state.activeExpense
            ? this.getGrapgh(this.state.activeExpense.items)
            : null}
        </div>
      </>
    );
  }
}

export default Reports;
