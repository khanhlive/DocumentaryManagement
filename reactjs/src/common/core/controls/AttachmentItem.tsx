import React, { Component } from 'react';
import AppConsts from '../../../lib/appconst';
import AttachmentService from '../../../services/danhmuc/attachment/AttachmentService';
import UiProgressbar from '../../ui/components/UiProgressbar';
import { formatBytes } from '../functions/formatFileSize';
import { IAttachmentsItemProps, IAttachmentsItemState } from '../models/Attachment';

export class AttachmentsItem extends Component<IAttachmentsItemProps, IAttachmentsItemState>{
    constructor(props: any) {
        super(props);
        this.state = {
            fileUpload: this.props.file,
            progress: 0
        }
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.hanleUpload();
    }
    hanleUpload() {

        if (!this.state.fileUpload?.isUpload === true) {
            let file = this.state.fileUpload || {};
            AttachmentService.upload(this.state.fileUpload?.content).then(res => {
                file = Object.assign(file, res);
                file.isUpload = true;
                console.log(file);
                this.setState({
                    progress: 100,
                    fileUpload: file
                })
                if (this.props.onSuccess !== undefined) {
                    this.props.onSuccess(this.state.fileUpload)
                }
            });


            // let interval = setInterval(() => {
            //     let percent = this.state.progress || 0;
            //     if (percent >= 100) {
            //         percent = 100;
            //         file.isUpload = true;
            //         file.name = file.content.name;
            //         clearInterval(interval);

            //     } else {
            //         percent += 5;
            //     }
            //     this.setState({
            //         progress: percent,
            //         fileUpload: file
            //     })
            // }, 100)
            // if (this.props.onSuccess !== undefined) {
            //     this.props.onSuccess(this.state.fileUpload)
            // }
        }
    }
    handleDelete() {
        if (this.props.onDelete !== undefined) {
            this.props.onDelete(this.state.fileUpload);
        }
    }
    render() {
        return (
            <li className="file-attach-item">
                <div className="file-attach-container">
                    <div className="file-attach-name">
                        {
                            this.state.fileUpload?.isUpload === true ? (
                                <a target="_blank" href={AppConsts.remoteServiceBaseUrl + '/' + this.state.fileUpload.url} className="file-attach-link">{this.state.fileUpload?.name}&nbsp;({formatBytes(this.state.fileUpload.size)})</a>
                            ) : <span>{this.state.fileUpload?.content.name}&nbsp;({formatBytes(this.state.fileUpload?.content.size)})</span>

                        }

                    </div>
                    {
                        !this.state.fileUpload?.isUpload === true ? (
                            <div className="file-attach-progress">
                                <div className="progress">
                                    <UiProgressbar
                                        className="progress-bar bg-color-blue"
                                        data-transitiongoal={this.state.progress?.toString()}
                                    />
                                </div>
                            </div>
                        ) : null
                    }
                    <span className="file-attach-close">
                        {
                            this.props.readOnly !== true ? (
                                <a onClick={this.handleDelete} title="Xóa tệp tin đính kèm" className="btn-close">&times;</a>
                            ) : null
                        }
                    </span>
                </div>

            </li>
        );
    }
}