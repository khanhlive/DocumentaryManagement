import React from "react";

import Chart from "chart.js";

import pressets from "./ChartJsPressets";

export default class ChartJsGraph extends React.Component {
  componentDidMount() {
    this.renderChart(this.props.data);
  }

  componentDidUpdate(prevProps) {
    // if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
    //   this.renderChart(this.props.data);
    // }
    this.renderChart(this.props.data);
  }

  renderChart(data) {
    var ctx = this.refs.canvas.getContext("2d");
    if (data) {
      let chart = new Chart(ctx, {
        type: this.props.type,
        data: data,
        options: this.props.options || (pressets[this.props.type] || {})
      });
      chart.update();
    }
  }

  render() {
    let style = {};
    if (this.props.height) {
      style = {
        height: this.props.height,
        width: this.props.width
      }
    }
    return (
      <canvas style={style} className={this.props.className} ref="canvas" />
    );
  }
}
