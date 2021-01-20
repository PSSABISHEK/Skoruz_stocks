import React, { Component } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

class graph extends Component {
  drawChart(data) {
    let svgWidth = 600,
      svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    d3.select("g").remove();
    let svg = d3
      .select("#sg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    let xAxis = d3
      .axisBottom(x)
      .tickFormat(d3.timeFormat("%H:%M"))
      .tickArguments([d3.timeMinute.every(15)]);
    let yAxis = d3.axisLeft(y);
    let line = d3
      .line()
      .x(function(d) {
        return x(d.time);
      })
      .y(function(d) {
        return y(d.value);
      });
    data.forEach(function(d) {
      d.time = parseDate(d.time);
      d.value = +d.value;
    });
    x.domain(
      d3.extent(data, function(d) {
        return d.time;
      })
    );
    y.domain(
      d3.extent(data, function(d) {
        return d.value;
      })
    );
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .select(".domain")
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(+90)")
      .attr("y", 1)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Time");

    g.append("g")
      .call(yAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(+90)")
      .attr("y", 1)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("High");

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }
  render() {
    if (this.props.info.length > 0) this.drawChart(this.props.info);
    return (
      <div>
        <br />
        <svg id="sg" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const d3graph = connect(mapStateToProps)(graph);
export default d3graph;
