import React, { Component } from 'react'
import { JarvisWidget } from '../../../../common'
import { DocumentaryType } from '../../../../common/core/models/Attachment';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';

export interface IDocumentaryFilterProps {
    onSearch?: (filterData: any) => any
}

export default class DocumentaryAwayFilterComponent extends Component<IDocumentaryFilterProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            filterData: {
                keyword: '',
                filterBy: 1,
                exactly: false,
                type: DocumentaryType.DocumentaryAway
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
            <JarvisWidget id="wid-id-filter-van-ban-di" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                <header>
                    <span className="widget-icon">
                        <i className="fa fa-search" />
                    </span>
                    <h2>Tìm kiếm</h2>
                </header>
                <div>
                    <div className="widget-body" style={{ minHeight: 'unset' }}>
                        <div className="row form-horizontal form-custom">

                            <div className="form-group">
                                <label className="control-label col-md-1">Từ khóa:&nbsp;&nbsp;</label>
                                <div className="col-md-5">
                                    <input className="form-control" onChange={this.handleInputChange} value={this.state.filterData.keyword} placeholder="Nhập từ khóa cần tìm kiếm..." name="keyword" type="text"></input>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-control">
                                        <label className="radio-inline" style={{ width: '47%' }}>
                                            <input onChange={this.handleInputChange} checked={this.state.filterData.filterBy == '1'} type="radio" value="1" name="filterBy"></input>Theo ký hiệu
                                                            </label>
                                        <label className="radio-inline">
                                            <input onChange={this.handleInputChange} checked={this.state.filterData.filterBy == '2'} type="radio" value="2" name="filterBy"></input>Theo tóm tắt
                                                            </label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <label className="checkbox-inline">
                                        <input onChange={this.handleInputChange} checked={this.state.filterData.exactly} type="checkbox" name="exactly"></input>Tìm chính xác</label>
                                </div>
                                <div className="col-md-1">
                                    <button type="button" onClick={this.handleSearch} className="btn btn-primary"><i className="fa fa-search"></i>&nbsp;Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </JarvisWidget>
        )
    }
}
