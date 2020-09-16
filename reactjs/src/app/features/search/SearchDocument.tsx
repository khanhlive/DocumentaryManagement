import React, { Component } from 'react'
import { JarvisWidget } from '../../../common';
import { validatorDate } from '../../../common/core';
import { DocumentaryType } from '../../../common/core/models/Attachment';
import { JavisWidgetDefault } from '../../../common/core/models/JavisDefault';
import SearchOptionDto from '../../../common/core/models/SearchOptionModel';
import BootstrapValidator from '../../../common/forms/validation/BootstrapValidator';
import UiDatepicker from '../../../common/ui/components/jquery/UiDatepicker';
declare var $: any;

export interface ISearchCommonProps {
    onSearch?: (filterData: any) => any,
    type: number
}

export interface ISearchCommonStates {
    filterData: SearchOptionDto
}
const validationRules = {
    feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
    },
    excluded: false,
    fields: {
        ngayBanHanhTu: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                callback: {
                    message: "Ngày không đúng định đạng",
                    callback: validatorDate
                }
            }
        },
        ngayBanHanhDen: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                callback: {
                    message: "Ngày không đúng định đạng",
                    callback: validatorDate
                }
            }
        },
        ngayGuiTu: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                callback: {
                    message: "Ngày không đúng định đạng",
                    callback: validatorDate
                }
            }
        },
        ngayGuiDen: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                callback: {
                    message: "Ngày không đúng định đạng",
                    callback: validatorDate
                }
            }
        },
    }
}
export default class SearchDocument extends Component<ISearchCommonProps, ISearchCommonStates> {

    public validator?: BootstrapValidator;
    public divForm?: HTMLDivElement;
    constructor(props: any) {
        super(props);
        let dto: SearchOptionDto = new SearchOptionDto();
        dto.type = this.props.type;
        this.state = {
            filterData: dto
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    handleSearch() {
        let isValid = this.validator?.isValid();
        if (isValid) {
            if (this.props.onSearch !== undefined) {
                this.props.onSearch(this.state.filterData);
            }
        }
    }

    handleSelectChange(e: any) {
        let filter = this.state.filterData || {};
        let name = e.target.name;
        let value = e.target.value;
        filter[name] = value;
        this.setState({
            filterData: filter,
        });
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
    handleDateChange(fieldname: string, selectedDate: string) {
        let model = this.state.filterData || {};
        model[fieldname] = selectedDate;
        this.setState({
            filterData: model,
        });
        $(this.divForm).bootstrapValidator("revalidateField", $(this.divForm).find('#' + fieldname));
    }
    render() {
        const _year = new Date().getFullYear();
        let source = [];
        for (let index = _year; index >= _year - 20; index--) {
            source.push(index);
        }
        return (
            <React.Fragment>
                <JarvisWidget id="wid-id-search-van-ban-di" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                    <header>
                        <span className="widget-icon">
                            <i className="fa fa-search" />
                        </span>
                        <h2>Tìm kiếm</h2>
                    </header>
                    <div>
                        <div className="widget-body" style={{ minHeight: 'unset' }}>
                            <BootstrapValidator ref={ref => this.validator = ref || undefined} options={validationRules}>

                                <div className="form-horizontal" ref={ref => this.divForm = ref || undefined}>
                                    <div className="form-group">
                                        <label className="control-label col-md-1">Ký hiệu văn bản:</label>
                                        <div className="col-md-3">
                                            <input className="form-control" onChange={this.handleInputChange} value={this.state.filterData.code} name="code" type="text"></input>
                                        </div>
                                        <label className="control-label col-md-1">Ngày ban hành từ:</label>
                                        <div className="col-md-3">
                                            <UiDatepicker
                                                dateFormat="dd/mm/yy"
                                                className="form-control"
                                                type="text"
                                                value={this.state.filterData.ngayBanHanhTu}
                                                name="ngayBanHanhTu"
                                                minRestrict="#ngayBanHanhDen"
                                                id="ngayBanHanhTu"
                                                placeholder="dd/MM/yyyy"
                                                onChange={this.handleDateChange}
                                            />
                                        </div>
                                        <label className="control-label col-md-1" style={{ paddingLeft: '0', paddingRight: '0' }}>Ngày ban hành đến:</label>
                                        <div className="col-md-3">
                                            <UiDatepicker
                                                dateFormat="dd/mm/yy"
                                                className="form-control"
                                                type="text"
                                                value={this.state.filterData.ngayBanHanhDen}
                                                name="ngayBanHanhDen"
                                                maxRestrict="#ngayBanHanhTu"
                                                id="ngayBanHanhDen"
                                                placeholder="dd/MM/yyyy"
                                                onChange={this.handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-1">Nơi ban hành:</label>
                                        <div className="col-md-3">
                                            <input className="form-control" onChange={this.handleInputChange} value={this.state.filterData.noiBanHanh} name="noiBanHanh" type="text"></input>
                                        </div>
                                        <label className="control-label col-md-1">{this.props.type == DocumentaryType.DocumentaryAway ? "Ngày gửi từ" : "Ngày nhận từ"}:</label>
                                        <div className="col-md-3">
                                            <UiDatepicker
                                                dateFormat="dd/mm/yy"
                                                className="form-control"
                                                type="text"
                                                minRestrict="#ngayGuiDen"
                                                value={this.state.filterData.ngayGuiTu}
                                                name="ngayGuiTu"
                                                id="ngayGuiTu"
                                                placeholder="dd/MM/yyyy"
                                                onChange={this.handleDateChange}
                                            />
                                        </div>
                                        <label className="control-label col-md-1" style={{ paddingLeft: '0', paddingRight: '0' }}>{this.props.type == DocumentaryType.DocumentaryAway ? "Ngày gửi đến" : "Ngày nhận đến"}:</label>
                                        <div className="col-md-3">
                                            <UiDatepicker
                                                dateFormat="dd/mm/yy"
                                                className="form-control"
                                                type="text"
                                                value={this.state.filterData.ngayGuiDen}
                                                name="ngayGuiDen"
                                                maxRestrict="#ngayGuiTu"
                                                id="ngayGuiDen"
                                                placeholder="dd/MM/yyyy"
                                                onChange={this.handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-1">Nội dung tóm tắt:</label>
                                        <div className="col-md-7">
                                            <input className="form-control" onChange={this.handleInputChange} value={this.state.filterData.noiDungTomTat} name="noiDungTomTat" type="text"></input>
                                        </div>
                                        <div className="col-md-2 col-md-offset-2 text-right">
                                            <button type="button" onClick={this.handleSearch} className="btn btn-primary"><i className="fa fa-search"></i>&nbsp;Tìm kiếm</button>
                                        </div>
                                    </div>
                                </div>
                            </BootstrapValidator>
                        </div>
                    </div>
                </JarvisWidget>
            </React.Fragment>
        )
    }
}