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
import DashboardForDocument from './DashboardForDocument';
import { isGranted } from '../../../lib/abpUtility';
import { PermissionNames } from '../../../lib/PermissionName';
import DashboardForViewer from './DashboardForViewer';

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
      },
      thongKeViewer: {

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
        thongKe: res.thongKeVanBan,
        thongKeViewer: res.thongKeVanBan_Viewer,
      })
    })


  }
  render() {

    const allowDocumentManager = isGranted(PermissionNames.Permission_DocumentManager);
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
          {
            allowDocumentManager ? (<DashboardForDocument thongKe={this.state.thongKe}></DashboardForDocument>) : null
          }
          {
            !allowDocumentManager ? (<DashboardForViewer thongKe={this.state.thongKeViewer}></DashboardForViewer>) : null
          }

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
