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
import { validatorTextNumber } from '../../../../common/core/functions/validateRules';
import CKEditorCommon from '../../../../common/forms/editors/CKEditorCommon';
import AttachmentsCommon from '../../../../common/core/controls/AttachmentsCommon';
import { DocumentaryType, FileUploadInfo } from '../../../../common/core/models/Attachment';
import UiDatepicker from '../../../../common/ui/components/jquery/UiDatepicker';
import CommonSelect from '../../../../common/core/controls/CommonSelect';
import { ApprovedType } from '../../../../lib/ApprovedType';
import userService from '../../../../services/user/userService';
import DepartmentService from '../../../../services/danhmuc/department/DepartmentService';
import ApprovedSelect from '../../commons/ApprovedSelect';
import { isGranted } from '../../../../lib/abpUtility';
import { PermissionNames } from '../../../../lib/PermissionName';
import RotationService from '../../../../services/danhmuc/rotation/RotationService';

export interface IEDocumentaryEditProps extends IEditComponentProps {
    onApproved: (id: number, data: any) => any
}
export interface IEDocumentaryEditState extends IEditComponentStates {
    validates?: Array<any>,
    isApproved?: boolean
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
                    callback: validatorTextNumber
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
        approvedName: {
            group: ".col-md-3",
            feedbackIcons: false,
            validators: {
                notEmpty: {
                    message: "Bạn chưa chọn người duyệt"
                }
            }
        },
        // approvedDepartmentId: {
        //     group: ".col-md-3",
        //     feedbackIcons: false,
        //     validators: {
        //         notEmpty: {
        //             message: "Bạn chưa chọn phòng ban duyệt"
        //         }
        //     }
        // },
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

export default class EDocumentaryEditComponent extends EditComponentBase<IEDocumentaryEditProps, IEDocumentaryEditState> {
    attachmentRef?: AttachmentsCommon;
    editor?: CKEditorCommon;
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: this.props.model || {},
            isApproved: false,
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
        this.handleSelectApprovedChange = this.handleSelectApprovedChange.bind(this);
        this.handleApprovedChange = this.handleApprovedChange.bind(this);
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

    handleApproved() {
        let isValid = this.validator?.isValid();
        if (isValid) {
            if (this.props.onApproved !== undefined) {
                this.props.onApproved(this.state.id || 0, this.state.model);
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
            isApproved: false
        }, () => {
            this.attachmentRef?.loadData();
        });
    }

    setValidator(approvedType: number) {
        if (approvedType == ApprovedType.Department) {
            this.validator?.addField("approvedDepartmentId", {
                group: ".col-md-3",
                feedbackIcons: false,
                validators: {
                    notEmpty: {
                        message: "Bạn chưa chọn phòng ban duyệt"
                    }
                }
            });
            this.validator?.removeField("approvedUserId")
        } else {
            this.validator?.addField("approvedUserId", {
                group: ".col-md-3",
                feedbackIcons: false,
                validators: {
                    notEmpty: {
                        message: "Bạn chưa chọn người duyệt"
                    }
                }
            })
            this.validator?.removeField("approvedDepartmentId")
        }
    }

    public edit(id: number, model: any) {
        this.setState({
            isShow: true,
            model: model,
            id: id,
            isEdit: true,
            isApproved: model.isApproved == true
        }, () => {
            this.attachmentRef?.loadData();
        });
        RotationService.view(id).then(res => {
            console.log(`you are view document with id: ${id}`, res);
        })
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

    public handleSelectApprovedChange(fieldName: string, data: any, approvedType: any) {
        let model = this.state.model || {};
        let _fieldName = ''
        if (approvedType == ApprovedType.Personal) {
            model['approvedDepartmentId'] = undefined;
            model['approvedDepartmentId_Name'] = undefined;
            _fieldName = 'approvedUserId';
        } else {
            model['approvedUserId'] = undefined;
            model['approvedUserId_Name'] = undefined;
            _fieldName = 'approvedDepartmentId';
        }
        model[_fieldName] = data?.value;
        model[_fieldName + '_Name'] = data?.label;
        model['approvedType'] = approvedType;
        this.setState({
            model: model,
        });
    }

    public handleApprovedChange(fieldName: string, approvedType: any) {
        let model = this.state.model || {};
        model[fieldName] = approvedType;
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
        const allowApproved = isGranted(PermissionNames.Permission_Approved);
        const allowDocument = isGranted(PermissionNames.Permission_DocumentManager);
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })} dialogClassName="modal-large-80vw" autoFocus={true}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit ? 'Cập nhật' : 'Thêm mới '} văn bản điện tử</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <BootstrapValidator ref={ref => this.validator = ref || undefined} options={(!allowDocument) ? {} : validationRules} onFieldChange={this.handleValidateField.bind(this)} >

                        <form ref={ref => this.form = ref || undefined} className="form-horizontal form-no-padding" onSubmit={this.onSubmit.bind(this)}>

                            <div className="">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Số/Ký hiệu<span className="text-required">(*)</span></label>
                                    <div className="col-md-3">
                                        <input type="text" readOnly={!allowDocument} onChange={this.handleInputChange} value={this.state.model.code} name="code" className="form-control"></input>
                                    </div>

                                    <label className="control-label col-md-1">Ngày ban hành<span className="text-required">(*)</span></label>
                                    <div className="col-md-3">
                                        <UiDatepicker
                                            readOnly={!allowDocument}
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
                                    <label className="control-label col-md-1">Ngày nhận</label>
                                    <div className="col-md-3">
                                        <UiDatepicker
                                            readOnly={!allowDocument}
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
                            <div className="">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Số đến</label>
                                    <div className="col-md-3">
                                        <input type="text" readOnly={!allowDocument} onChange={this.handleInputChange} value={this.state.model.textNumber} name="textNumber" className="form-control"></input>
                                    </div>

                                    <label className="control-label col-md-1">Người ký</label>
                                    <div className="col-md-3">
                                        <input type="text" readOnly={!allowDocument} onChange={this.handleInputChange} name="signer" value={this.state.model.signer} className="form-control"></input>
                                    </div>
                                    <label className="control-label col-md-1">Người duyệt<span className="text-required">(*)</span></label>
                                    <div className="col-md-3">
                                        <ApprovedSelect readOnly={!allowDocument}
                                            value={this.state.model.approvedType == ApprovedType.Personal ? this.state.model.approvedUserId : this.state.model.approvedDepartmentId}
                                            label={this.state.model.approvedType == ApprovedType.Personal ? (this.state.model.approvedUserId_Name || '') : (this.state.model.approvedDepartmentId_Name || '')}
                                            onChange={this.handleSelectApprovedChange}
                                            onApprovedChange={this.handleApprovedChange}
                                            approvedType={this.state.model.approvedType || ApprovedType.Personal}
                                            fieldName="approvedName"
                                        ></ApprovedSelect>

                                    </div>
                                </div>
                            </div>
                            <div className="">

                                <div className="form-group">
                                    <label className="control-label col-md-1">Người nhận</label>
                                    <div className="col-md-3">
                                        <input type="text" readOnly={!allowDocument} onChange={this.handleInputChange} value={this.state.model.receivedBy} name="receivedBy" className="form-control"></input>
                                    </div>
                                    <label className="control-label col-md-1">Loại văn bản<span className="text-required">(*)</span></label>
                                    <div className="col-md-3">
                                        <DocumentTypeSelect readOnly={!allowDocument} useQuickAdd={true} value={this.state.model.documentTypeId} label={this.state.model.documentTypeId_Name} fieldName="documentTypeId" onChange={this.handleSelectChange}>

                                        </DocumentTypeSelect>
                                    </div>
                                    <label className="control-label col-md-1">Nơi ban hành<span className="text-required">(*)</span></label>
                                    <div className="col-md-3">
                                        <AgencyIssuedSelect readOnly={!allowDocument} useQuickAdd={true} value={this.state.model.agencyIssuedId} label={this.state.model.agencyIssuedId_Name} fieldName="agencyIssuedId" onChange={this.handleSelectChange}>

                                        </AgencyIssuedSelect>
                                    </div>
                                </div>

                            </div>
                            <div className="">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Số trang</label>
                                    <div className="col-md-3">
                                        <div className="input-group">
                                            <input type="number" readOnly={!allowDocument} onChange={this.handleInputChange} value={this.state.model.totalPage} name="totalPage" className="form-control"></input>
                                            <span className="input-group-addon">
                                                <label className="checkbox" style={{ marginLeft: "20px" }}><input type="checkbox" disabled={!allowDocument} name="isProcessed" checked={this.state.model.isProcessed} onChange={this.handleInputChange}></input>Đã xử lý xong</label>
                                            </span>
                                        </div>

                                    </div>

                                    <label className="control-label col-md-1">Lĩnh vực</label>
                                    <div className="col-md-7">
                                        <input type="text" readOnly={!allowDocument} onChange={this.handleInputChange} name="categoryName" value={this.state.model.categoryName} className="form-control"></input>
                                    </div>

                                </div>
                            </div>
                            <div className="">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Người thực hiện</label>
                                    <div className="col-md-3">
                                        <input type="text" readOnly={!allowDocument} className="form-control" value={this.state.model.performancePerson} name="performancePerson" onChange={this.handleInputChange}>

                                        </input>
                                    </div>
                                    <label className="control-label col-md-1">Ghi chú</label>
                                    <div className="col-md-7">
                                        <input type="text" readOnly={!allowDocument} className="form-control" value={this.state.model.description} name="description" onChange={this.handleInputChange}>

                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Nội dung tóm tắt</label>
                                    <div className="col-md-11">
                                        <textarea rows={2} readOnly={!allowDocument} className="form-control" value={this.state.model.summaryContent} name="summaryContent" onChange={this.handleInputChange}>

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
                            <div className="">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Nội dung văn bản</label>
                                    <div className="col-md-11">
                                        <CKEditorCommon readOnly={!allowDocument} ref={ref => this.editor = ref || undefined} fieldName="content" data={this.state.model.content} onChange={this.handleEditorChange}>

                                        </CKEditorCommon>
                                        {/* <textarea rows={10} className="form-control" name="content" onChange={this.handleInputChange}>

                                        </textarea> */}
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <div className="form-group">
                                    <label className="control-label col-md-1">Tệp đính kèm</label>
                                    <div className="col-md-11">
                                        <AttachmentsCommon readOnly={!allowDocument} onChange={this.handleAttachmentChange} ref={ref => this.attachmentRef = ref || undefined} id={this.state.model.id || 0} type={DocumentaryType.EDocumentary}></AttachmentsCommon>
                                    </div>
                                </div>
                            </div>
                            {
                                (this.state.model.id > 0) && (allowApproved || allowDocument) ? (
                                    <div>
                                        <fieldset>
                                            <legend>Thông tin duyệt</legend>
                                            <div className="form-group">
                                                <label className="control-label col-md-1">Nội dung duyệt</label>
                                                <div className="col-md-11">
                                                    <textarea rows={3} readOnly={!allowApproved || this.state.isApproved} className="form-control" value={this.state.model.approvedContent} name="approvedContent" onChange={this.handleInputChange}>
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-11 col-md-offset-1">
                                                    <div className="checkbox">
                                                        <label className=""><input type="checkbox" disabled={!allowApproved || this.state.isApproved} onChange={this.handleInputChange} checked={this.state.model.isApproved == true} name="isApproved" id="isApproved"></input> Đã duyệt</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                ) : null
                            }
                        </form>
                    </BootstrapValidator>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-default" onClick={() => this.editor?.print()}><i className="fa fa-print"></i> In</button>
                    {
                        (allowApproved && (this.state.model.id > 0)) ? (
                            <button disabled={this.state.isApproved} type="button" className="btn btn-info" onClick={this.handleApproved.bind(this)}><i className="fa fa-check"></i> Duyệt</button>
                        ) : null
                    }
                    {
                        allowDocument ? (
                            <button disabled={this.state.isApproved} type="button" className="btn btn-info" onClick={this.handleSave.bind(this)}><i className="fa fa-save"></i> Lưu lại</button>
                        ) : null
                    }

                    <button type="button" className="btn btn-default" onClick={this.handleClose.bind(this)}><i className="fa fa-remove"></i> Đóng</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
