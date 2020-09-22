import React from "react";
import { WidgetGrid } from "../../../common/widgets/components";
import { Stats } from "../../../common/layout/components";
import { BigBreadcrumbs } from "../../../common/navigation";
import { ChartJsGraph } from "../../../common/graphs/chartjs";
import {
  JarvisWidget
} from "../../../common";
import DashboardService from '../../../services/dashboard/DashboardService'

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
      barChartData: {},
      thongKe: {
        soVanBanDi: 0,
        soVanBanDen: 0,
        soVanBanDi_DaXuLy: 0,
        soVanBanDen_DaXuLy: 0,
      }
    };
  }
  componentDidMount() {
    DashboardService.get().then(res => {
      this.setState({
        barChartData: {
          "labels": res.bieuDo.labels,
          "datasets": [
            {
              "label": "Văn bản đi",
              "data": res.bieuDo.vanBanDi,
              "fill": true,
              "backgroundColor": "#FF6384"
            },
            {
              "label": "Văn bản đến",
              "data": res.bieuDo.vanBanDen,
              "fill": true,
              "backgroundColor": "#36A2EB",
            }
          ]
        },
        thongKe: res.thongKeVanBan
      })
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
                  <h3>{this.state.thongKe.soVanBanDi}</h3>
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
                  <h3>{this.state.thongKe.soVanBanDen}</h3>
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
                  <h3>{this.state.thongKe.soVanBanDi_DaXuLy}</h3>
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
                  <h3>{this.state.thongKe.soVanBanDen_DaXuLy}</h3>
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
