import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import { JarvisWidget } from '../../../../common'
import { DocumentaryType } from '../../../../common/core/models/Attachment';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';

export interface IDocumentaryFilterProps {
    onSearch?: (filterData: any) => any,
    isApproved?: boolean
}

export default class DocumentaryInternalFilterComponent extends Component<IDocumentaryFilterProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            filterData: {
                keyword: '',
                filterBy: 1,
                exactly: false,
                type: DocumentaryType.DocumentaryInternal
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch() {
        if (this.props.onSearch !== undefined) {
            this.props.onSearch(this.state.filterData);
        }
    }

    public getData() {
        return this.state.filterData;
    }

    public handleInputChange(e: any) {
        let filter = this.state.filterData || {};
        let name = e.target.name;
        let type = e.target.type;
        let value = type === "checkbox" ? e.target.checked : e.target.value;
        filter[name] = value;
        this.setState({
            filterData: filter,
        });
    }
    render() {
        return (
            <JarvisWidget id="wid-id-filter-van-ban-noi-bo" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                <header>
                    <span className="widget-icon">
                        <i className="fa fa-search" />
                    </span>
                    <h2>Tìm kiếm</h2>
                </header>
                <div>
                    <div className="widget-body" style={{ minHeight: 'unset' }}>
                        <div className="form-horizontal form-custom">
                            <div className="col-lg-5 col-md-6">
                                <div className="form-group">
                                    <div>
                                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Từ khóa</label>
                                        <div className="col-sm-10">
                                            <input className="form-control" onChange={this.handleInputChange} value={this.state.filterData.keyword} placeholder="Nhập từ khóa cần tìm kiếm..." name="keyword" type="text"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="form-group">
                                    <div className="col-lg-12 col-lg-offset-0 col-md-10 col-md-offset-2  col-sm-10 col-sm-offset-2">
                                        <div className="form-control">
                                            <label className="radio-inline" style={{ width: '47%' }}>
                                                <input onChange={this.handleInputChange} checked={this.state.filterData.filterBy == '1'} type="radio" value="1" name="filterBy"></input>Theo ký hiệu
                                                            </label>
                                            <label className="radio-inline">
                                                <input onChange={this.handleInputChange} checked={this.state.filterData.filterBy == '2'} type="radio" value="2" name="filterBy"></input>Theo tóm tắt
                                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dynamic-clear"></div>
                            <div className="col-lg-2 col-md-6">
                                <div className="form-group">
                                    <div className="col-lg-12 col-lg-offset-0 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2">
                                        <label className="checkbox-inline">
                                            <input
                                                onChange={this.handleInputChange}
                                                checked={this.state.filterData.exactly}
                                                type="checkbox" name="exactly"
                                            ></input>
                                                Tìm chính xác
                                                </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-5">
                                <div className="form-group">
                                    <div className="col-sm-12 text-right">
                                        <button type="button" onClick={this.handleSearch} className="btn btn-primary"><i className="fa fa-search"></i>&nbsp;Tìm kiếm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </JarvisWidget>
        )
    }
}
