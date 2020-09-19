import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator'
import notify from '../../../../common/utils/functions/notify';
import userService from '../../../../services/user/userService';

export interface IChangePasswordProps {
    onSuccess: () => any
}

export default class ChangePassword extends Component<IChangePasswordProps, any> {

    form?: HTMLFormElement;
    validator?: BootstrapValidator;
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: {
                currentPassword: '',
                newPassword: '',
                newPasswordRetype: ''
            }
        }
        this.open = this.open.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    open() {
        this.setState({
            isShow: true,
            model: {
                currentPassword: '',
                newPassword: '',
                newPasswordRetype: ''
            }
        });
    }

    handleSave(e?: any) {
        e?.preventDefault();
        let isValid = this.validator?.isValid();
        if (isValid) {
            let model = this.state.model;
            userService.changePassword(model).then(res => {
                notify('', `Thay đổi mật khẩu thành công`, 'success');
                this.validator?.resetForm();
                this.setState({
                    isShow: false
                })
                this.props.onSuccess();
            })
        } else {
            notify('Thông báo', 'Dữ liệu nhập chưa chính xác', 'error', 'fa fa-remove');
        }
    }

    public handleInputChange(e: any) {
        let model = this.state.model || {};
        let name = e.target.name;
        let type = e.target.type;
        let value = type === "checkbox" ? e.target.checked : e.target.value;
        model[name] = value;
        this.setState({
            model: model,
        });
    }
    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })}>

                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <BootstrapValidator ref={ref => this.validator = ref || undefined}>
                        <form
                            ref={ref => this.form = ref || undefined}
                            id="attributeForm"
                            className="form-horizontal"
                            data-bv-message="Thông tin chưa hợp lệ"
                            data-bv-excluded="false"
                            data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                            data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                            data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
                        >
                            <div className="form-group">
                                <label className="control-label col-md-3">Mật khẩu hiện tại<span className="text-required">(*)</span></label>
                                <div className="col-md-9">
                                    <input
                                        type="password"
                                        className="form-control"
                                        onChange={this.handleInputChange}
                                        name="currentPassword"
                                        data-bv-notempty="true"
                                        data-bv-notempty-message="Mật khẩu không được để trống"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3">Mật khẩu mới<span className="text-required">(*)</span></label>
                                <div className="col-md-9">
                                    <input
                                        type="password"
                                        className="form-control"
                                        onChange={this.handleInputChange}
                                        name="newPassword"
                                        data-bv-notempty="true"
                                        data-bv-notempty-message="Mật khẩu không được để trống"
                                        data-bv-identical="true"
                                        data-bv-identical-field="newPasswordRetype"
                                        data-bv-identical-message="Mật khẩu không trùng nhau"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3">Nhập lại mật khẩu mới<span className="text-required">(*)</span></label>
                                <div className="col-md-9">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="newPasswordRetype"
                                        data-bv-notempty="true"
                                        data-bv-notempty-message="Mật khẩu không được để trống"
                                        data-bv-identical="true"
                                        data-bv-identical-field="newPassword"
                                        data-bv-identical-message="Mật khẩu không trùng nhau"
                                    />
                                </div>
                            </div>
                        </form>
                    </BootstrapValidator>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-info" onClick={this.handleSave}><i className="fa fa-save"></i> Thay đổi</button>
                    <button type="button" className="btn btn-default" onClick={() => this.setState({ isShow: false })}><i className="fa fa-remove"></i> Đóng</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
