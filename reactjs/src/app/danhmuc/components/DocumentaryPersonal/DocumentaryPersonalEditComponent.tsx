import React from 'react'
import { Modal } from 'react-bootstrap'
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator';
import notify from '../../../../common/utils/functions/notify';
import IEditComponentProps from '../../../../common/core/models/EditingComponentProps';
import IEditComponentStates from '../../../../common/core/models/EditComponentStates';
import EditComponentBase from '../../../../common/core/models/EditComponent';
import DocumentTypeSelect from '../../commons/DocumentTypeSelect';
import AgencyIssuedSelect from '../../commons/AgencyIssuedSelect';
import { validatorCode, validatorTextNumber } from '../../../../common/core';
import CKEditorCommon from '../../../../common/forms/editors/CKEditorCommon';
import AttachmentsCommon from '../../../../common/core/controls/AttachmentsCommon';
import { DocumentaryType, FileUploadInfo } from '../../../../common/core/models/Attachment';

export interface IDocumentaryPersonalEditProps extends IEditComponentProps {

}
export interface IDocumentaryPersonalEditState extends IEditComponentStates {
    validates?: Array<any>
}

const validationRules = {
    feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
    },
    excluded: false,
    fields: {
        code: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "Bạn chưa nhập ký hiệu văn bản"
                },
                stringLength: {
                    max: 50,
                    message: "Nhập tối đa 50 ký tự"
                },
                callback: {
                    message: 'Mã chỉ bao gồm chữ số, chữ cái và dấu gạch dưới',
                    callback: validatorTextNumber
                }
            }
        },
        name: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "Bạn chưa nhập tên văn bản"
                },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        documentTypeId: {
            group: ".col-md-4",
            feedbackIcons: false,
            validators: {
                notEmpty: {
                    message: "Bạn chưa chọn loại văn bản"
                },
            }
        },
        agencyIssuedId: {
            group: ".col-md-4",
            feedbackIcons: false,
            validators: {
                notEmpty: {
                    message: "Bạn chưa chọn nơi ban hành"
                },
            }
        },
        abridgment: {
            group: ".col-md-10",
            validators: {
                notEmpty: {
                    message: "Bạn chưa nhập trích lược văn bản"
                },
                stringLength: {
                    max: 8000,
                    message: "Nhập tối đa 8000 ký tự"
                }
            }
        }
    }
}

export default class DocumentaryPersonalEditComponent extends EditComponentBase<IDocumentaryPersonalEditProps, IDocumentaryPersonalEditState> {
    attachmentRef?: AttachmentsCommon;
    editor?: CKEditorCommon;
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: this.props.model || {},
            id: this.props.id,
            isEdit: false,
            validates: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.isValidField = this.isValidField.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleAttachmentChange = this.handleAttachmentChange.bind(this);
    }
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
    public create(model: any) {
        this.setState({
            isShow: true,
            model: model || {},
            id: 0,
            isEdit: false,
        }, () => {
            this.attachmentRef?.loadData();
        });
    }
    public edit(id: number, model: any) {
        this.setState({
            isShow: true,
            model: model,
            id: id,
            isEdit: true,
        }, () => {
            this.attachmentRef?.loadData();
        });
    }
    handleValidateField(data: { field: string, valid: boolean }) {
        let fields = this.state.validates;
        let field = fields?.find(p => p.field === data.field);
        if (field) {
            fields?.forEach(item => {
                if (item.field === data.field) {
                    item.valid = data.valid;
                }
            })
        } else {
            fields?.push(data);
        }
        //this.setState({ validates: fields });
    }

    isValidField(fieldName: string) {
        let fields = this.state.validates;
        let field = fields?.find(p => p.field === fieldName);
        if (field) {
            return field.valid;
        } else {
            return undefined;
        }
    }

    handleAttachmentChange(data: FileUploadInfo[], dataDelete: FileUploadInfo[]) {
        let model = this.state.model || {};
        model['appAttachments'] = data;
        model['appAttachmentsDelete'] = dataDelete;
        this.setState({
            model: model,
        });
    }

    handleSelectChange(fieldName: string, selectedItem: any) {
        let model = this.state.model || {};
        model[fieldName] = selectedItem.value;
        this.setState({
            model: model,
        });
    }

    handleEditorChange(fieldName: string, data: any) {
        let model = this.state.model || {};
        model[fieldName] = data;
        this.setState({
            model: model,
        });
    }

    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })} dialogClassName="modal-large-60vw" autoFocus={true}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit ? 'Cập nhật' : 'Thêm mới '} văn bản cá nhân</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <BootstrapValidator ref={ref => this.validator = ref || undefined} options={validationRules} onFieldChange={this.handleValidateField.bind(this)} >

                        <form ref={ref => this.form = ref || undefined} className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>

                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-2">Ký hiệu<span className="text-required">(*)</span></label>
                                    <div className="col-md-4">
                                        <input type="text" onChange={this.handleInputChange} value={this.state.model.code} name="code" className="form-control"></input>
                                    </div>

                                    <label className="control-label col-md-2">Tên văn bản<span className="text-required">(*)</span></label>
                                    <div className="col-md-4">
                                        <input type="text" onChange={this.handleInputChange} name="name" value={this.state.model.name} className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group">
                                    <label className="control-label col-md-2">Loại văn bản<span className="text-required">(*)</span></label>
                                    <div className="col-md-4">
                                        <DocumentTypeSelect useQuickAdd={true} value={this.state.model.documentTypeId} label={this.state.model.documentTypeId_Name} fieldName="documentTypeId" onChange={this.handleSelectChange}>

                                        </DocumentTypeSelect>
                                    </div>
                                    <label className="control-label col-md-2">Nơi ban hành<span className="text-required">(*)</span></label>
                                    <div className="col-md-4">
                                        <AgencyIssuedSelect useQuickAdd={true} value={this.state.model.agencyIssuedId} label={this.state.model.agencyIssuedId_Name} fieldName="agencyIssuedId" onChange={this.handleSelectChange}>

                                        </AgencyIssuedSelect>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-2">Tệp đính kèm</label>
                                    <div className="col-md-10">
                                        <AttachmentsCommon onChange={this.handleAttachmentChange} ref={ref => this.attachmentRef = ref || undefined} id={this.state.model.id || 0} type={DocumentaryType.DocumentaryPersonal}></AttachmentsCommon>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-2">Trích yếu<span className="text-required">(*)</span></label>
                                    <div className="col-md-10">
                                        <textarea rows={10} className="form-control" value={this.state.model.abridgment} name="abridgment" onChange={this.handleInputChange}>

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-2">Nội dung văn bản</label>
                                    <div className="col-md-10">
                                        <CKEditorCommon ref={ref => this.editor = ref || undefined} fieldName="content" data={this.state.model.content} onChange={this.handleEditorChange}>

                                        </CKEditorCommon>
                                        {/* <textarea rows={10} className="form-control" name="content" onChange={this.handleInputChange}>

                                        </textarea> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </BootstrapValidator>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-default" onClick={() => this.editor?.print()}><i className="fa fa-print"></i> In</button>
                    <button type="button" className="btn btn-info" onClick={this.handleSave.bind(this)}><i className="fa fa-save"></i> Lưu lại</button>
                    <button type="button" className="btn btn-default" onClick={this.handleClose.bind(this)}><i className="fa fa-remove"></i> Đóng</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
