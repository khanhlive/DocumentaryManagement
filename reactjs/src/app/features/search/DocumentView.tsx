import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import AttachmentsCommon from '../../../common/core/controls/AttachmentsCommon';
import { DocumentaryType } from '../../../common/core/models/Attachment';
import CKEditorCommon from '../../../common/forms/editors/CKEditorCommon';
import UiDatepicker from '../../../common/ui/components/jquery/UiDatepicker';
import DocumentaryDto from '../../../services/danhmuc/documentary/dto/DocumentaryDto';
import AgencyIssuedSelect from '../../danhmuc/commons/AgencyIssuedSelect';
import DocumentTypeSelect from '../../danhmuc/commons/DocumentTypeSelect';

export interface IDocumentViewProps {
    //model: DocumentaryDto,
    type: number,
    onCancle?: () => any
}

export default class DocumentView extends Component<IDocumentViewProps, any> {
    attachmentRef?: AttachmentsCommon;
    constructor(props: IDocumentViewProps) {
        super(props);
        this.state = {
            isShow: false,
            model: {}
        }
        this.open = this.open.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    public open(model: DocumentaryDto) {
        this.setState({
            isShow: true,
            model: model
        }, () => {
            this.attachmentRef?.loadData();
        });
    }
    public handleClose() {
        this.setState({ isShow: false });
        if (this.props.onCancle !== undefined) {
            this.props.onCancle();
        }
    }


    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })} dialogClassName="modal-large-60vw">

                <Modal.Header closeButton>
                    <Modal.Title>Thông tin văn bản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-horizontal">
                        <div className="row">
                            <div className="form-group">
                                <label className="control-label col-md-1">Ký hiệu</label>
                                <div className="col-md-3">
                                    <input type="text" readOnly={true} defaultValue={this.state.model.code} name="code" className="form-control"></input>
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
                                        readOnly={true}
                                    />
                                </div>
                                <label className="control-label col-md-1">{this.props.type == DocumentaryType.DocumentaryAway ? "Ngày gửi" : "Ngày nhận"}</label>
                                <div className="col-md-3">
                                    <UiDatepicker
                                        dateFormat="dd/mm/yy"
                                        className="form-control"
                                        type="text"
                                        value={this.state.model.receivedDate}
                                        name="receivedDate"
                                        id="receivedDate"
                                        placeholder="dd/MM/yyyy"
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                {/* <label className="control-label col-md-1">Số đi</label>
                                <div className="col-md-3">
                                    <input type="text" value={this.props.model.textNumber} name="textNumber" className="form-control"></input>
                                </div> */}

                                <label className="control-label col-md-1">Người ký</label>
                                <div className="col-md-3">
                                    <input type="text" name="signer" readOnly={true} defaultValue={this.state.model.signer} className="form-control"></input>
                                </div>
                                <label className="control-label col-md-1">Người duyệt</label>
                                <div className="col-md-3">
                                    <input type="text" name="approvedBy" readOnly={true} defaultValue={this.state.model.approvedBy} className="form-control"></input>
                                </div>
                                <label className="control-label col-md-1">{this.props.type == DocumentaryType.DocumentaryAway ? "Người gửi" : "Người nhận"}</label>
                                <div className="col-md-3">
                                    <input type="text" readOnly={true} defaultValue={this.state.model.receivedBy} name="receivedBy" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="form-group">

                                <label className="control-label col-md-1">Loại văn bản</label>
                                <div className="col-md-3">
                                    <DocumentTypeSelect readOnly={true} useQuickAdd={true} value={this.state.model.documentTypeId} label={this.state.model['documentTypeId_Name']} fieldName="documentTypeId">

                                    </DocumentTypeSelect>
                                </div>
                                <label className="control-label col-md-1">Nơi ban hành</label>
                                <div className="col-md-3">
                                    <AgencyIssuedSelect readOnly={true} useQuickAdd={true} value={this.state.model.agencyIssuedId} label={this.state.model['agencyIssuedId_Name']} fieldName="agencyIssuedId">

                                    </AgencyIssuedSelect>
                                </div>
                                <label className="control-label col-md-1">{this.props.type == DocumentaryType.DocumentaryAway ? "Nơi nhận" : "Người thực hiện"}</label>
                                <div className="col-md-3">
                                    <input type="text" readOnly={true} className="form-control" defaultValue={this.state.model.performancePerson} name="performancePerson" >

                                    </input>
                                </div>
                            </div>

                        </div>
                        {/* <div className="row">
                            <div className="form-group">
                                <label className="control-label col-md-1">Số trang</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" value={this.props.model.totalPage} name="totalPage" className="form-control"></input>
                                        <span className="input-group-addon">
                                            <label className="checkbox" style={{ marginLeft: "20px" }}><input type="checkbox" name="isProcessed" checked={this.props.model.isProcessed} ></input>Đã xử lý xong</label>
                                        </span>
                                    </div>

                                </div>

                                <label className="control-label col-md-1">Lĩnh vực</label>
                                <div className="col-md-7">
                                    <input type="text" name="categoryName" value={this.props.model.categoryName} className="form-control"></input>
                                </div>

                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="form-group">
                                <label className="control-label col-md-1">Nơi nhận</label>
                                <div className="col-md-11">
                                    <input type="text" className="form-control" value={this.props.model.performancePerson} name="performancePerson" >

                                    </input>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="form-group">
                                <label className="control-label col-md-1">Ghi chú</label>
                                <div className="col-md-11">
                                    <input type="text" className="form-control" value={this.props.model.description} name="description" >

                                    </input>
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="form-group">
                                <label className="control-label col-md-1">Tóm tắt</label>
                                <div className="col-md-11">
                                    <textarea rows={2} readOnly={true} className="form-control" defaultValue={this.state.model.summaryContent} name="summaryContent" >

                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="control-label col-md-1">Nội dung</label>
                                <div className="col-md-11">
                                    <CKEditorCommon
                                        fieldName="content"
                                        data={this.state.model.content}
                                        readOnly={true}
                                    >
                                    </CKEditorCommon>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label className="control-label col-md-1">Tệp đính kèm</label>
                                <div className="col-md-11">
                                    <AttachmentsCommon readOnly={true} ref={ref => this.attachmentRef = ref || undefined} id={this.state.model.id || 0} type={this.props.type}></AttachmentsCommon>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-default" onClick={this.handleClose}><i className="fa fa-remove"></i> Đóng</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
