import React from 'react'
import { Modal } from 'react-bootstrap'
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator';
import notify from '../../../../common/utils/functions/notify';
import IEditComponentProps from '../../../../common/core/models/EditingComponentProps';
import IEditComponentStates from '../../../../common/core/models/EditComponentStates';
import EditComponentBase from '../../../../common/core/models/EditComponent';

export interface IDocumentTypeEditProps extends IEditComponentProps {

}
export interface IDocumentTypeEditState extends IEditComponentStates {

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
                    message: "Bạn chưa nhập mã loại văn bản"
                },
                stringLength: {
                    max: 50,
                    message: "Nhập tối đa 50 ký tự"
                }
            }
        },
        name: {
            group: ".col-md-10",
            validators: {
                notEmpty: {
                    message: "Bạn chưa nhập tên loại văn bản"
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

export default class DocumentTypeEditComponent extends EditComponentBase<IDocumentTypeEditProps, IDocumentTypeEditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: this.props.model || {},
            id: this.props.id,
            isEdit: false
        }
    }
    // create(model: any) {
    //     this.setState({
    //         isShow: true,
    //         model: model || {},
    //         id: 0,
    //         isEdit: false
    //     })

    // }

    // edit(id: number, model: any) {
    //     this.setState({
    //         isShow: true,
    //         model: model,
    //         id: id,
    //         isEdit: true
    //     })
    // }

    // handleSave() {
    //     this.form?.dispatchEvent(new Event('submit'));
    // }

    // handleClose() {
    //     this.setState({ isShow: false })
    //     if (this.props.onCancle != undefined) {
    //         this.props.onCancle();
    //     }
    // }
    onSubmit(e: any) {
        e.preventDefault();
        let isValid = this.validator?.isValid();
        if (isValid) {
            if (this.props.onSave !== undefined) {
                this.props.onSave(this.state.id || 0, this.state.model);
            }
        } else {
            notify('Thông báo', 'Dữ liệu nhập chưa chính xác', 'error', 'fa fa-remove');
        }
    }
    // handleInputChange(e: any) {
    //     let model = this.state.model;
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     model[name] = value;
    //     this.setState({
    //         model: model
    //     })

    // }
    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit ? 'Cập nhật' : 'Thêm mới '} loại văn bản</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <BootstrapValidator ref={ref => this.validator = ref || undefined} options={validationRules}>

                        <form ref={ref => this.form = ref || undefined} className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                            <div className="form-group">
                                <label className="control-label col-md-2">Mã loại</label>
                                <div className="col-md-10">
                                    <input type="text" onChange={this.handleInputChange.bind(this)} value={this.state.model.code} name="code" className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-2">Tên loại</label>
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
