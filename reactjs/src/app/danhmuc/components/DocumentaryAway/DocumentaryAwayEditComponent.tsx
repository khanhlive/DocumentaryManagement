import React from 'react'
import { Modal } from 'react-bootstrap'
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator';
import notify from '../../../../common/utils/functions/notify';
import IEditComponentProps from '../../../../common/core/models/EditingComponentProps';
import IEditComponentStates from '../../../../common/core/models/EditComponentStates';
import EditComponentBase from '../../../../common/core/models/EditComponent';
import DocumentTypeSelect from '../../commons/DocumentTypeSelect';
import AgencyIssuedSelect from '../../commons/AgencyIssuedSelect';
import { validatorCode, validatorDate } from '../../../../common/core';
import CKEditorCommon from '../../../../common/forms/editors/CKEditorCommon';
import AttachmentsCommon from '../../../../common/core/controls/AttachmentsCommon';
import { DocumentaryType, FileUploadInfo } from '../../../../common/core/models/Attachment';
import UiDatepicker from '../../../../common/ui/components/jquery/UiDatepicker';

export interface IDocumentaryEditProps extends IEditComponentProps {

}
export interface IDocumentaryEditState extends IEditComponentStates {
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
            group: ".col-md-3",
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
                    callback: validatorCode
                }
            }
        },
        textNumber: {
            group: ".col-md-3",
            validators: {
                stringLength: {
                    max: 50,
                    message: "Nhập tối đa 50 ký tự"
                },
                // callback: {
                //     message: 'Mã chỉ bao gồm chữ số, chữ cái và dấu gạch dưới',
                //     callback: validatorCode
                // }
            }
        },
        releaseDate: {
            group: ".col-md-3",
            validators: {
                notEmpty: {
                    message: "Bạn chưa nhập ngày ban hành"
                },
                callback: {
                    message: "Ngày không đúng định đạng",
                    callback: validatorDate
                }
            }
        },
        receivedDate: {
            group: ".col-md-3",
            validators: {
                callback: {
                    message: "Ngày không đúng định đạng",
                    callback: validatorDate
                }
            }
        },
        signer: {
            group: ".col-md-3",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên văn bản"
                // },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        approvedBy: {
            group: ".col-md-3",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên văn bản"
                // },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        receivedBy: {
            group: ".col-md-3",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên văn bản"
                // },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        categoryName: {
            group: ".col-md-7",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên văn bản"
                // },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        performancePerson: {
            group: ".col-md-11",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên văn bản"
                // },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        description: {
            group: ".col-md-11",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên văn bản"
                // },
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        summaryContent: {
            group: ".col-md-11",
            validators: {
                // notEmpty: {
                //     message: "Bạn chưa nhập tên văn bản"
                // },
                stringLength: {
                    max: 2500,
                    message: "Nhập tối đa 2500 ký tự"
                }
            }
        },
        documentTypeId: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                notEmpty: {
                    message: "Bạn chưa chọn loại văn bản"
                },
            }
        },
        agencyIssuedId: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                notEmpty: {
                    message: "Bạn chưa chọn nơi ban hành"
                },
            }
        },
        totalPage: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                greaterThan: {
                    value: 0,
                    inclusive: false,
                    message: "Số trang phải lớn hơn 0"
                },
            }
        },
        // abridgment: {
        //     group: ".col-md-10",
        //     validators: {
        //         notEmpty: {
        //             message: "Bạn chưa nhập trích lược văn bản"
        //         },
        //         stringLength: {
        //             max: 8000,
        //             message: "Nhập tối đa 8000 ký tự"
        //         }
        //     }
        // }
    }
}

export default class DocumentaryAwayEditComponent extends EditComponentBase<IDocumentaryEditProps, IDocumentaryEditState> {
    attachmentRef?: AttachmentsCommon;
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
        this.handleDateChange = this.handleDateChange.bind(this);
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

    handleDateChange(fieldname: string, selectedDate: string) {
        let model = this.state.model || {};
        model[fieldname] = selectedDate;
        this.setState({
            model: model,
        });
    }

    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })} dialogClassName="modal-large-80vw" autoFocus={true}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit ? 'Cập nhật' : 'Thêm mới '} văn bản đi</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <BootstrapValidator ref={ref => this.validator = ref || undefined} options={validationRules} onFieldChange={this.handleValidateField.bind(this)} >

                        <form ref={ref => this.form = ref || undefined} className="form-horizontal form-no-padding" onSubmit={this.onSubmit.bind(this)}>

                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Số/Ký hiệu</label>
                                    <div className="col-md-3">
                                        <input type="text" onChange={this.handleInputChange} value={this.state.model.code} name="code" className="form-control"></input>
                                    </div>

                                    <label className="control-label col-md-1">Ngày ban hành</label>
                                    <div className="col-md-3">
                                        <UiDatepicker
                                            dateFormat="dd/mm/yy"
                                            className="form-control"
                                            type="text"
                                            name="releaseDate"
                                            value={this.state.model.releaseDate}
                                            id="releaseDate"
                                            placeholder="dd/MM/yyyy"
                                            onChange={this.handleDateChange}
                                        />
                                        {/* <input type="text" onChange={this.handleInputChange} name="releaseDate" value={this.state.model.releaseDate} className="form-control"></input> */}
                                    </div>
                                    <label className="control-label col-md-1">Ngày gửi</label>
                                    <div className="col-md-3">
                                        <UiDatepicker
                                            dateFormat="dd/mm/yy"
                                            className="form-control"
                                            type="text"
                                            value={this.state.model.receivedDate}
                                            name="receivedDate"
                                            id="receivedDate"
                                            placeholder="dd/MM/yyyy"
                                            onChange={this.handleDateChange}
                                        />
                                        {/* <input type="text" onChange={this.handleInputChange} name="receivedDate" value={this.state.model.receivedDate} className="form-control"></input> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Số đi</label>
                                    <div className="col-md-3">
                                        <input type="text" onChange={this.handleInputChange} value={this.state.model.textNumber} name="textNumber" className="form-control"></input>
                                    </div>

                                    <label className="control-label col-md-1">Người ký</label>
                                    <div className="col-md-3">
                                        <input type="text" onChange={this.handleInputChange} name="signer" value={this.state.model.signer} className="form-control"></input>
                                    </div>
                                    <label className="control-label col-md-1">Người duyệt</label>
                                    <div className="col-md-3">
                                        <input type="text" onChange={this.handleInputChange} name="approvedBy" value={this.state.model.approvedBy} className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group">
                                    <label className="control-label col-md-1">Người gửi</label>
                                    <div className="col-md-3">
                                        <input type="text" onChange={this.handleInputChange} value={this.state.model.receivedBy} name="receivedBy" className="form-control"></input>
                                    </div>
                                    <label className="control-label col-md-1">Loại văn bản</label>
                                    <div className="col-md-3">
                                        <DocumentTypeSelect useQuickAdd={true} value={this.state.model.documentTypeId} label={this.state.model.documentTypeId_Name} fieldName="documentTypeId" onChange={this.handleSelectChange}>

                                        </DocumentTypeSelect>
                                    </div>
                                    <label className="control-label col-md-1">Nơi ban hành</label>
                                    <div className="col-md-3">
                                        <AgencyIssuedSelect useQuickAdd={true} value={this.state.model.agencyIssuedId} label={this.state.model.agencyIssuedId_Name} fieldName="agencyIssuedId" onChange={this.handleSelectChange}>

                                        </AgencyIssuedSelect>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Số trang</label>
                                    <div className="col-md-3">
                                        <div className="input-group">
                                            <input type="number" onChange={this.handleInputChange} value={this.state.model.totalPage} name="totalPage" className="form-control"></input>
                                            <span className="input-group-addon">
                                                <label className="checkbox" style={{ marginLeft: "20px" }}><input type="checkbox" name="isProcessed" checked={this.state.model.isProcessed} onChange={this.handleInputChange}></input>Đã xử lý xong</label>
                                            </span>
                                        </div>

                                    </div>

                                    <label className="control-label col-md-1">Lĩnh vực</label>
                                    <div className="col-md-7">
                                        <input type="text" onChange={this.handleInputChange} name="categoryName" value={this.state.model.categoryName} className="form-control"></input>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Nơi nhận</label>
                                    <div className="col-md-11">
                                        <input type="text" className="form-control" value={this.state.model.performancePerson} name="performancePerson" onChange={this.handleInputChange}>

                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Ghi chú</label>
                                    <div className="col-md-11">
                                        <input type="text" className="form-control" value={this.state.model.description} name="description" onChange={this.handleInputChange}>

                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Nội dung tóm tắt</label>
                                    <div className="col-md-11">
                                        <textarea rows={2} className="form-control" value={this.state.model.summaryContent} name="summaryContent" onChange={this.handleInputChange}>

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Nội dung</label>
                                    <div className="col-md-11">
                                        <textarea rows={10} className="form-control" value={this.state.model.abridgment} name="abridgment" onChange={this.handleInputChange}>

                                        </textarea>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Nội dung văn bản</label>
                                    <div className="col-md-11">
                                        <CKEditorCommon fieldName="content" data={this.state.model.content} onChange={this.handleEditorChange}>

                                        </CKEditorCommon>
                                        {/* <textarea rows={10} className="form-control" name="content" onChange={this.handleInputChange}>

                                        </textarea> */}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Tệp đính kèm</label>
                                    <div className="col-md-11">
                                        <AttachmentsCommon onChange={this.handleAttachmentChange} ref={ref => this.attachmentRef = ref || undefined} id={this.state.model.id || 0} type={DocumentaryType.DocumentaryAway}></AttachmentsCommon>
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
