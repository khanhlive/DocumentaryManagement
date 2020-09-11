import React from 'react'
import { Modal } from 'react-bootstrap'
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator';
import notify from '../../../../common/utils/functions/notify';
import IEditComponentProps from '../../../../common/core/models/EditingComponentProps';
import IEditComponentStates from '../../../../common/core/models/EditComponentStates';
import EditComponentBase from '../../../../common/core/models/EditComponent';
import { validatorCode } from '../../../../common/core';

export interface IAgencyIssuedEditProps extends IEditComponentProps {

}
export interface IAgencyIssuedEditState extends IEditComponentStates {

}

const validationRules = {
    feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
    },
    fields: {
        code: {
            group: ".col-md-10",
            validators: {
                notEmpty: {
                    message: "Bạn chưa nhập mã cơ quan ban hành"
                },
                stringLength: {
                    max: 50,
                    message: "Nhập tối đa 50 ký tự"
                },
                callback: {
                    message: 'Mã chỉ bao gồm chữ số, chữ cái và dấu gạch dưới',
                    callback: validatorCode
                }
            }
        },
        name: {
            group: ".col-md-10",
            validators: {
                notEmpty: {
                    message: "Bạn chưa nhập tên cơ quan ban hành"
                },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        description: {
            group: ".col-md-10",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên loại văn bản"
                // },
                stringLength: {
                    max: 2000,
                    message: "Nhập tối đa 2000 ký tự"
                }
            }
        }
    }
}

export default class AgencyIssuedEditComponent extends EditComponentBase<IAgencyIssuedEditProps, IAgencyIssuedEditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: this.props.model || {},
            id: this.props.id,
            isEdit: false
        }
    }
    onSubmit(e?: any) {
        e?.preventDefault();
        let isValid = this.validator?.isValid();
        if (isValid) {
            if (this.props.onSave !== undefined) {
                this.props.onSave(this.state.id || 0, this.state.model);
            }
        } else {
            notify('Thông báo', 'Dữ liệu nhập chưa chính xác', 'error', 'fa fa-remove');
        }
    }
    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit ? 'Cập nhật' : 'Thêm mới '} cơ quan ban hành</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <BootstrapValidator ref={ref => this.validator = ref || undefined} options={validationRules}>

                        <div ref={ref => this.divForm = ref || undefined} className="form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-md-2">Mã cơ quan</label>
                                <div className="col-md-10">
                                    <input type="text" onChange={this.handleInputChange.bind(this)} value={this.state.model.code} name="code" className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-2">Tên cơ quan</label>
                                <div className="col-md-10">
                                    <input type="text" onChange={this.handleInputChange.bind(this)} name="name" value={this.state.model.name} className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-2">Ghi chú</label>
                                <div className="col-md-10">
                                    <textarea rows={4} onChange={this.handleInputChange.bind(this)} name="description" value={this.state.model.description} className="form-control">

                                    </textarea>
                                </div>
                            </div>
                        </div>
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
