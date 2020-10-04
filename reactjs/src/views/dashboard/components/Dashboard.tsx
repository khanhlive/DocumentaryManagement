import React from "react";
import { WidgetGrid } from "../../../common/widgets/components";
import { Stats } from "../../../common/layout/components";
import { BigBreadcrumbs } from "../../../common/navigation";
import { ChartJsGraph } from "../../../common/graphs/chartjs";
import {
  JarvisWidget
} from "../../../common";
import DashboardService from '../../../services/dashboard/DashboardService'
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import BreadcrumbStoreApp from '../../../stores/BreadcrumbStore';
import { Link } from 'react-router-dom';

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
export interface IDashboardProps {
  breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class Dashboard extends React.Component<IDashboardProps, any> {
  constructor(props: any) {
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
        {
          this.props.breadcrumbStore?.useBigBreadcrum == true ? (
            <div className="row">
              <BigBreadcrumbs
                items={["Thống kê"]}
                icon="fa fa-fw fa-table"
              />
              {
                this.props.breadcrumbStore?.useStats == true ? (
                  <Stats />
                ) : null
              }
            </div>
          ) : null
        }

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
                <Link to={'/quan-ly-van-ban/van-ban-di'} className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </Link>
                {/* <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a> */}
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
                <Link to={'/quan-ly-van-ban/van-ban-den'} className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </Link>
                {/* <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a> */}
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
                <Link to={'/quan-ly-van-ban/van-ban-di'} className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </Link>
                {/* <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a> */}
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
                <Link to={'/quan-ly-van-ban/van-ban-den'} className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </Link>
                {/* <a href="#" className="small-box-footer">
                  Xem thêm <i className="fa fa-arrow-circle-right" />
                </a> */}
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
