import React, { Component } from 'react';
import Dropzone, { DropzoneRef, FileRejection } from 'react-dropzone';
import AttachmentService from '../../../services/danhmuc/attachment/AttachmentService';
import guid from '../functions/guid';
import { FileUploadInfo, IAttachmentCommonProps, IAttachmentCommonStates } from '../models/Attachment';
import { AttachmentsItem } from './AttachmentItem';

export default class AttachmentsCommon extends Component<IAttachmentCommonProps, IAttachmentCommonStates> {
    dropzone?: DropzoneRef;
    constructor(props: any) {
        super(props);
        let maxSize;
        maxSize = 10 * 1024 * 1024;
        this.state = {
            maxSize: maxSize,
            files: [],
            filesDelete: []
        }
        this.handleOpenFile = this.handleOpenFile.bind(this);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {

    }
    loadData() {
        console.log(this.props.id, this.props.type)
        if (this.props.id === undefined || this.props.id === 0) {
            this.setState({ files: [] })
        } else if (this.props.type == 3) {
            AttachmentService.GetByDocumentaryPersonalId(this.props.id).then(res => {
                let data: FileUploadInfo[] = res.map(item => {
                    let file: FileUploadInfo = {
                        isUpload: true
                    };
                    file = Object.assign(file, item);
                    return file;
                })
                this.setState({ files: data })
            })
        } else {
            AttachmentService.GetByDocumentaryId(this.props.id, this.props.type).then(res => {
                let data: FileUploadInfo[] = res.map(item => {
                    let file: FileUploadInfo = {
                        isUpload: true
                    };
                    file = Object.assign(file, item);
                    return file;
                })
                this.setState({ files: data })
            })
        }
    }
    handleOpenFile() {
        this.dropzone?.open();
    }
    handleAcceptedFiles(acceptedFiles: any, rejectedFiles: FileRejection[]) {
        //console.log(acceptedFiles);
        let files = this.state.files;
        let fileUploads = acceptedFiles.map((item: any) => {
            let file: FileUploadInfo = {
                content: item,
                isUpload: false,
                guid: guid()
            };
            return file;
        })
        files = files?.concat(fileUploads);
        this.setState({
            files: files
        })
    }

    handleDelete(data?: FileUploadInfo) {
        let files = this.state.files;
        let filesDelete = this.state.filesDelete;
        filesDelete?.push(data || {});
        let source = files?.filter((p: any) => (p.isUpload === true ? p.id !== data?.id : p.guid !== data?.guid));
        this.setState({
            files: source,
            filesDelete: filesDelete
        });
        this.raiseOnChange(files, filesDelete);
    }
    raiseOnChange(files?: FileUploadInfo[], filesDelete?: FileUploadInfo[]) {
        if (this.props.onChange !== undefined) {
            let data = files?.map(item => {
                let file: FileUploadInfo = Object.assign({}, item);
                file.content = null;
                file.type = this.props.type;
                return file;
            })
            this.props.onChange(data || [], filesDelete || []);
        }
    }

    handleSuccess(data?: FileUploadInfo) {
        //console.log('upload success', data);
        if (data?.guid != undefined) {
            let files = this.state.files;
            let filesDelete = this.state.filesDelete;
            files?.forEach((file: FileUploadInfo) => {
                if (file.guid === data.guid) {
                    file.name = data.name;
                    file.isUpload = data.isUpload;
                }
            })
            this.setState({
                files: files
            })
            this.raiseOnChange(files, filesDelete);
        }
    }
    render() {
        let accept = null;
        if (this.props.accessType == null || this.props.accessType == undefined || this.props.accessType == '') {
            accept = ' ,image/png, image/jpeg, application/zip, application/x-zip, application/x-zip-compressed, application/octet-stream, application/x-rar-compressed , application/pdf, ' +
                'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, ' +
                'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        } else {
            accept = this.props.accessType;
        }
        let multi = false;
        if (this.props.multiple)
            multi = true;
        return (
            <div className="attachment-container">
                <div className="attachment-list">
                    <ul>
                        {
                            this.state.files?.map((file: any, index: any) =>
                                <AttachmentsItem onDelete={this.handleDelete} onSuccess={this.handleSuccess} key={'item_' + index} file={file} ></AttachmentsItem>
                            )
                        }
                    </ul>
                </div>
                <div className="attachment-footer">
                    <a type='button' className="btn btn-attachment" onClick={this.handleOpenFile}><i className="fa fa-upload"></i></a>
                    <div className="hidden">
                        <Dropzone onDrop={this.handleAcceptedFiles} ref={ref => this.dropzone = ref || undefined}
                            multiple={multi} maxSize={this.state.maxSize}
                            accept={accept}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                </div>
            </div>
        )
    }
}
