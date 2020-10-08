import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export interface IDashboardForDocumentProps {
    thongKe: any
}

export default class DashboardForDocument extends Component<IDashboardForDocumentProps, any> {
    render() {
        return (
            <div className="row">
                <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-aqua">
                        <div className="inner">
                            <h3>{this.props.thongKe.soVanBanDi}</h3>
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
                            <h3>{this.props.thongKe.soVanBanDen}</h3>
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
                            <h3>{this.props.thongKe.soVanBanDi_DaXuLy}</h3>
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
                            <h3>{this.props.thongKe.soVanBanDen_DaXuLy}</h3>
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
        )
    }
}
