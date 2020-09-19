import React from "react";
import { WidgetGrid } from "../../../common/widgets/components";
import { Stats } from "../../../common/layout/components";
import { BigBreadcrumbs } from "../../../common/navigation";
import { ChartJsGraph } from "../../../common/graphs/chartjs";
import {
  JarvisWidget
} from "../../../common";

const options = {
  responsive: false,
  "scales": {
    "yAxes": [
      {
        "ticks": {
          "beginAtZero": true
        }
      }]
  }
}

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartData: {}
    };
  }
  componentDidMount() {
    this.setState({
      barChartData: {
        "labels": ["January", "February", "March", "April", "May", "June", "July"],
        "datasets": [
          {
            "label": "Văn bản đi",
            "data": [65, 59, 80, 81, 56, 55, 40],
            "fill": true,
            "backgroundColor": "#FF6384",//rgba(255, 99, 132, 0.2)",
            //"borderColor": "rgb(255, 99, 132)",
            //"borderWidth": 1
          },
          {
            "label": "Văn bản đến",
            "data": [22, 11, 43, 55, 26, 89, 45],
            "fill": true,
            "backgroundColor": "#36A2EB",//"rgba(255, 159, 64, 0.2)",
            //"borderColor": "rgb(255, 159, 64)",
            //"borderWidth": 1
          }
        ]
      }
    })

  }
  render() {
    return (
      <div id="content" className="animated fadeInUp">
        <div className="row">
          <BigBreadcrumbs
            items={["Bảng điều khiển"]}
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />
          <Stats />
        </div>

        <WidgetGrid>

          <div className="row">
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>150</h3>
                  <p>Văn bản đi</p>
                </div>
                <div className="icon">
                  <i className="fa fa-shopping-cart" />
                </div>
                <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                  <p>Văn bản đến</p>
                </div>
                <div className="icon">
                  <i className="fa fa-bar-chart-o" />
                </div>
                <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>44</h3>
                  <p>Văn bản đi đã được xử lý</p>
                </div>
                <div className="icon">
                  <i className="fa fa-users" />
                </div>
                <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-red">
                <div className="inner">
                  <h3>65</h3>
                  <p>Văn bản đến đã được xử lý</p>
                </div>
                <div className="icon">
                  <i className="fa fa-pie-chart" />
                </div>
                <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
          </div>

          <div className="row">
            <article className="col-sm-12 col-md-12 col-lg-12">

              <JarvisWidget id="wid-id-3" editbutton={false}>
                <header>
                  <span className="widget-icon">
                    <i className="fa fa-bar-chart-o" />
                  </span>
                  <h2>Thống kê văn bản theo tháng</h2>
                </header>
                <div>
                  <div className="widget-body">
                    <ChartJsGraph type="bar" height="400px" width="100%" options={options} data={this.state.barChartData} />
                  </div>
                </div>
              </JarvisWidget>
            </article>
          </div>
        </WidgetGrid>
      </div>
    );
  }
}
