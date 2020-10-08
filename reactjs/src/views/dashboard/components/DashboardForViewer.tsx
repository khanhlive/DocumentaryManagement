import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export interface IDashboardForDocumentProps {
    thongKe: any
}
export default class DashboardForViewer extends Component<IDashboardForDocumentProps, any> {
    render() {
        return (
            <div className="row">

                {/* ./col */}
                <div className="col-lg-3 col-xs-4">
                    {/* small box */}
                    <div className="small-box bg-green">
                        <div className="inner">
                            <h3>{this.props.thongKe.soVanBanDen}</h3>
                            <p>Văn bản đến</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-bar-chart-o" />
                        </div>
                        <Link to={'/quan-ly-van-ban/van-ban-den'} className="small-box-footer">
                            Xem thêm <i className="fa fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-yellow">
                        <div className="inner">
                            <h3>{this.props.thongKe.soVanBanDenDaXem}</h3>
                            <p>Văn bản đến đã xem</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-users" />
                        </div>
                        <Link to={'/quan-ly-van-ban/van-ban-den'} className="small-box-footer">
                            Xem thêm <i className="fa fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-red">
                        <div className="inner">
                            <h3>{this.props.thongKe.soVanBanDenChuaXem}</h3>
                            <p>Văn bản đến chưa xem</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-pie-chart" />
                        </div>
                        <Link to={'/quan-ly-van-ban/van-ban-den'} className="small-box-footer">
                            Xem thêm <i className="fa fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* ./col */}
            </div>
        )
    }
}
