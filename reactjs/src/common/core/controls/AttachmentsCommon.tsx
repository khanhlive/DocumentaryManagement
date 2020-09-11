import React, { Component } from 'react';
import Dropzone, { DropzoneRef } from 'react-dropzone'

export default class AttachmentsCommon extends Component<any, any> {
    dropzone?: DropzoneRef;
    constructor(props: any) {
        super(props);
        let maxSize;
        maxSize = 10 * 1024 * 1024;
        this.state = {
            maxSize: maxSize,
            files: []
        }
        this.handleOpenFile = this.handleOpenFile.bind(this);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    }

    handleOpenFile() {
        this.dropzone?.open();
    }
    handleAcceptedFiles(acceptedFiles: any) {
        console.log(acceptedFiles);
        let files = this.state.files;
        files = files.concat(acceptedFiles);
        this.setState({
            files: files
        })
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
                    <ol>
                        {
                            this.state.files.map((file: any, index: any) =>
                                <li key={'item_' + index}>{file.name}</li>
                            )
                        }
                    </ol>
                </div>
                <div className="attachment-footer">
                    <a type='button' className="btn btn-attachment" href="javascripts:" onClick={this.handleOpenFile}><i className="fa fa-upload"></i></a>
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
