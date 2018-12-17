import React, { Component } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

class graph extends Component {
  drawChart(data) {
    let svgWidth = 600,
      svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let x = d3.scaleTime().rangeRound([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);
    let line = d3
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.value);
      });
    x.domain(
      d3.extent(data, function(d) {
        return d.date;
      })
    );
    y.domain(
      d3.extent(data, function(d) {
        return d.value;
      })
    );
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();
    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
    return <svg />;
  }

  render() {
    if (this.props.info.length > 0) this.drawChart(this.props.info);
    return (
      <div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const d3graph = connect(mapStateToProps)(graph);
export default d3graph;
