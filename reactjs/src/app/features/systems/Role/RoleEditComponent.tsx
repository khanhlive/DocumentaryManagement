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
import roleService from '../../../../services/role/roleService';

export interface IRoleEditProps extends IEditComponentProps {

}
export interface IRoleEditState extends IEditComponentStates {
    permissions: any[],
}

export default class RoleEditComponent extends EditComponentBase<IRoleEditProps, IRoleEditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: this.props.model || {},
            id: this.props.id,
            isEdit: false,
            permissions: []
        }
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {

    }

    getFormData() {
        roleService.getAllPermissions().then(res => {
            this.setState({
                permissions: res
            })
        })
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
                                        Thông tin quyền
                                                </a>
                                </li>
                                <li>
                                    <a href="#s2" data-toggle="tab">Chi tiết quyền
                                                </a>
                                </li>

                            </ul>
                            <div id="myTabContent1" className="tab-content padding-10">
                                <div className="tab-pane fade in active" id="s1">
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Quyền<span className="text-required">(*)</span></label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                onChange={this.handleInputChange.bind(this)}
                                                value={this.state.model.name}
                                                name="name"
                                                className="form-control"
                                                data-bv-notempty="true"
                                                data-bv-notempty-message="Chưa nhập quyền"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Tên hiển thị<span className="text-required">(*)</span></label>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.handleInputChange.bind(this)}
                                                name="displayName"
                                                value={this.state.model.displayName}
                                                className="form-control"
                                                type="text"
                                                data-bv-notempty="true"
                                                data-bv-notempty-message="Chưa nhập tên hiển thị"
                                                data-bv-stringlength="true"
                                                data-bv-stringlength-max="250"
                                                data-bv-stringlength-message="Nhập tên hiển thị không quá 250 ký tự"
                                            >

                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-md-3">Mô tả</label>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.handleInputChange.bind(this)}
                                                name="description"
                                                value={this.state.model.description}
                                                className="form-control"
                                                type="text"
                                                data-bv-stringlength="true"
                                                data-bv-stringlength-max="250"
                                                data-bv-stringlength-message="Nhập mô tả không quá 250 ký tự"
                                            >

                                            </input>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="s2">
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <div className="checkbox">
                                                {
                                                    this.state.permissions.map((item: any) => {
                                                        return (
                                                            <label key={item.name} className="checkbox"><input
                                                                data-bv-message="Bạn phải chọn ít nhất 1 quyền"
                                                                data-bv-notempty="true"
                                                                onChange={this.handleCheckbox}
                                                                type="checkbox"
                                                                name="grantedPermissions"
                                                                checked={this.state.model?.grantedPermissions?.indexOf(item.name) >= 0}
                                                                value={item.name}
                                                            ></input>{item.displayName}</label>
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
