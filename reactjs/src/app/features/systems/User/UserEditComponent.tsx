import axios from 'axios';
import moment from 'moment';
import React from 'react'
import { Modal } from 'react-bootstrap'
import Select from 'react-select/src/Select';
import { validatorCode } from '../../../../common/core';
import CommonSelect from '../../../../common/core/controls/CommonSelect';
import EditComponentBase from '../../../../common/core/models/EditComponent';
import IEditComponentStates from '../../../../common/core/models/EditComponentStates';
import IEditComponentProps from '../../../../common/core/models/EditingComponentProps';
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator';
import notify from '../../../../common/utils/functions/notify';
import DepartmentService from '../../../../services/danhmuc/department/DepartmentService';
import ProvinceService from '../../../../services/danhmuc/province/ProvinceService';
import userService from '../../../../services/user/userService';

export interface IUserEditProps extends IEditComponentProps {

}
export interface IUserEditState extends IEditComponentStates {
    roleNames: any[],
    provinces: any[],
    departments: any[]
}

export default class UserEditComponent extends EditComponentBase<IUserEditProps, IUserEditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: this.props.model || {},
            id: this.props.id,
            isEdit: false,
            roleNames: [],
            provinces: [],
            departments: []
        }
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {

    }

    getFormData() {
        const req = [userService.getRoles(), ProvinceService.getPaging(0, 9999999), DepartmentService.getPaging(0, 9999999)];
        axios.all(req).then(axios.spread((...res) => {
            let departments = res[2].items.map((item: any) => { return { value: item.id, label: item.name } });
            this.setState({
                roleNames: res[0],
                provinces: res[1].items,
                departments: departments
            });
        }));
    }

    handleCheckbox(e: any) {
        let model = this.state.model || {};
        let name = e.target.name;
        let checked = e.target.checked;
        let value = e.target.value;
        let items = model[name] || [];
        if (checked === true) {
            if (items.indexOf(value) < 0) {
                items.push(value);
            }
        } else {
            if (items.indexOf(value) >= 0) {
                items.splice(items.indexOf(value), 1);
            }
        }
        model[name] = items;
        this.setState({
            model: model,
        });
    }
    onSubmit(e?: any) {
        e?.preventDefault();
        let isValid = this.validator?.isValid();
        if (isValid) {
            if (this.props.onSave !== undefined) {
                let model = this.state.model;
                var _date = moment(model.creationTime, 'dd/MM/yyyy HH:mm:ss');
                model.creationTime = _date.date;
                this.props.onSave(this.state.id || 0, this.state.model);
            }
        } else {
            notify('Thông báo', 'Dữ liệu nhập chưa chính xác', 'error', 'fa fa-remove');
        }
    }
    handleSelectChange(fieldName: string, selectedItem: any) {
        let model = this.state.model || {};
        model[fieldName] = selectedItem.value;
        this.setState({
            model: model,
        });
    }
    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit ? 'Cập nhật' : 'Thêm mới '} tài khoản</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <BootstrapValidator ref={ref => this.validator = ref || undefined}>
                        <form
                            ref={ref => this.form = ref || undefined}
                            id="attributeForm"
                            onSubmit={this.onSubmit}
                            className="form-horizontal"
                            data-bv-message="Thông tin chưa hợp lệ"
                            data-bv-excluded="false"
                            data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                            data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                            data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
                        >
                            <ul id="myTab1" className="nav nav-tabs bordered">
                                <li className="active">
                                    <a href="#s1" data-toggle="tab">
                                        Thông tin tài khoản
                                                </a>
                                </li>
                                <li>
                                    <a href="#s2" data-toggle="tab">Phân quyền
                                                </a>
                                </li>

                            </ul>
                            <div id="myTabContent1" className="tab-content padding-10">
                                <div className="tab-pane fade in active" id="s1">
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Họ tên<span className="text-required">(*)</span></label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                onChange={this.handleInputChange.bind(this)}
                                                value={this.state.model.fullName2}
                                                name="fullName2"
                                                className="form-control"
                                                data-bv-notempty="true"
                                                data-bv-notempty-message="Chưa nhập họ tên"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Tên đăng nhập<span className="text-required">(*)</span></label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                onChange={this.handleInputChange.bind(this)}
                                                name="userName" value={this.state.model.userName}
                                                className="form-control"
                                                data-bv-message="Tên đăng nhập không hợp lệ"
                                                data-bv-notempty="true"
                                                data-bv-notempty-message="Tên đăng nhập không được để trống"
                                                data-bv-regexp="true"
                                                data-bv-regexp-regexp="^[a-zA-Z0-9_\.]+$"
                                                data-bv-regexp-message="Tên đăng nhập chỉ bao gồm chữ cái, số, dấu chấm(.) và dấu gạch dưới(_)"
                                                data-bv-stringlength="true"
                                                data-bv-stringlength-min="5"
                                                data-bv-stringlength-max="30"
                                                data-bv-stringlength-message="Tên đăng nhập phải từ 5-30 ký tự"
                                                data-bv-different="true"
                                                data-bv-different-field="password"
                                                data-bv-different-message="Tên đăng nhập và mật khẩu không được trùng nhau"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Email<span className="text-required">(*)</span></label>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.handleInputChange.bind(this)}
                                                name="emailAddress"
                                                value={this.state.model.emailAddress}
                                                className="form-control"
                                                type="email"
                                                data-bv-emailaddress="true"
                                                data-bv-emailaddress-message="Địa chỉ email không hợp lệ"
                                            >

                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Phòng ban</label>
                                        <div className="col-md-9">
                                            <select
                                                className="form-control"
                                                onChange={this.handleInputChange.bind(this)}
                                                name="departmentId"
                                                value={this.state.model.departmentId}
                                            >
                                                <option>--Chọn phòng ban--</option>
                                                {
                                                    this.state.departments.map((item: any) => {
                                                        return <option key={item.value} value={item.value}>{item.label}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Điện thoại</label>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.handleInputChange.bind(this)}
                                                name="phoneNumber"
                                                value={this.state.model.phoneNumber}
                                                className="form-control"
                                                type="text"
                                                data-bv-digits="true"
                                                data-bv-digits-message="Số điện thoại không đúng"
                                                data-bv-stringlength="true"
                                                data-bv-stringlength-min="10"
                                                data-bv-stringlength-max="11"
                                                data-bv-stringlength-message="Số điện thoại phải có 10 hoặc 11 số"
                                            >

                                            </input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3">Đơn vị</label>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.handleInputChange.bind(this)}
                                                name="organization"
                                                value={this.state.model.organization}
                                                className="form-control"
                                                type="text"
                                                data-bv-stringlength="true"
                                                data-bv-stringlength-max="250"
                                                data-bv-stringlength-message="Nhập địa chỉ không quá 250 ký tự"
                                            >

                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Tỉnh thành</label>
                                        <div className="col-md-9">
                                            <select
                                                className="form-control"
                                                onChange={this.handleInputChange.bind(this)}
                                                name="provinceId"
                                                value={this.state.model.provinceId}
                                            >
                                                {
                                                    this.state.provinces.map((item: any) => {
                                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Địa chỉ</label>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.handleInputChange.bind(this)}
                                                name="address"
                                                value={this.state.model.address}
                                                className="form-control"
                                                type="text"
                                                data-bv-stringlength="true"
                                                data-bv-stringlength-max="250"
                                                data-bv-stringlength-message="Nhập địa chỉ không quá 250 ký tự"
                                            >

                                            </input>
                                        </div>
                                    </div>
                                    {
                                        this.state.isEdit === false ? (
                                            <React.Fragment>
                                                <div className="form-group">
                                                    <label className="control-label col-md-3">Mật khẩu<span className="text-required">(*)</span></label>
                                                    <div className="col-md-9">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            onChange={this.handleInputChange.bind(this)}
                                                            name="password"
                                                            data-bv-notempty="true"
                                                            data-bv-notempty-message="Mật khẩu không được để trống"
                                                            data-bv-identical="true"
                                                            data-bv-identical-field="confirmPassword"
                                                            data-bv-identical-message="Mật khẩu không trùng nhau"
                                                            data-bv-different="true"
                                                            data-bv-different-field="username"
                                                            data-bv-different-message="Mật khẩu không được trùng với tên đăng nhập"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-3">Nhập lại mật khẩu<span className="text-required">(*)</span></label>
                                                    <div className="col-md-9">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            name="confirmPassword"
                                                            data-bv-notempty="true"
                                                            data-bv-notempty-message="Mật khẩu không được để trống"
                                                            data-bv-identical="true"
                                                            data-bv-identical-field="password"
                                                            data-bv-identical-message="Mật khẩu không trùng nhau"
                                                            data-bv-different="true"
                                                            data-bv-different-field="username"
                                                            data-bv-different-message="Mật khẩu không được trùng với tên đăng nhập"
                                                        />
                                                    </div>
                                                </div></React.Fragment>
                                        ) : null
                                    }

                                    <div className="form-group">
                                        <label className="control-label col-md-3">&nbsp;</label>
                                        <div className="col-md-9">
                                            <label className="checkbox-inline"><input type="checkbox" onChange={this.handleInputChange.bind(this)} name="isActive" checked={this.state.model.isActive}></input>Kích hoạt</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="s2">
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <div className="checkbox">
                                                {
                                                    this.state.roleNames.map((item: any) => {
                                                        return (
                                                            <label key={item.id} className="checkbox"><input
                                                                data-bv-message="Bạn phải chọn ít nhất 1 quyền hạn"
                                                                data-bv-notempty="true" onChange={this.handleCheckbox} type="checkbox" name="roleNames" checked={this.state.model?.roleNames?.indexOf(item.normalizedName) >= 0} value={item.normalizedName}></input>{item.displayName}</label>
                                                        );
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </BootstrapValidator>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-info" onClick={this.handleSave.bind(this)}><i className="fa fa-save"></i> Lưu lại</button>
                    <button type="button" className="btn btn-default" onClick={this.handleClose.bind(this)}><i className="fa fa-remove"></i> Đóng</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
