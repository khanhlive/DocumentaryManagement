import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import AppConsts from '../../../lib/appconst';
import LoadingOverlay from 'react-loading-overlay';

// export interface IPrintingProps {

// }

// export interface IPrintingStates {
//     isShow: boolean,
//     model?: PrintingModel
// }

// export class PrintingModel {
//     params?: any;
//     url?: string;
//     isPrint?: boolean;
// }


export default class PrintingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            model: {},
            spinner: false
        }
    }

    open(model) {
        let _url = `${AppConsts.remoteServiceBaseUrl}/report/${model.url}?`;
        let _params = [];
        for (const key in model.params) {
            _params.push(`${key}=${model.params[key]}`);
        }
        _url = _url + _params.join('&') + (model.isPrint === true ? "&autoprint=true" : '');
        let _model = Object.assign({}, model, { url: _url });
        this.setState({
            isShow: true,
            model: _model, spinner: true
        });
    }

    handleClose() {
        this.setState({
            isShow: false,
            model: {}
        });
    }
    render() {
        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false, model: {} })} dialogClassName="modal-large-80vw" autoFocus={true}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="body-report">
                    <iframe onLoad={(e) => { this.setState({ spinner: false }) }} style={{ width: '100%', height: '100%', display: (this.state.spinner ? 'none' : 'block') }} src={this.state.model?.url}>
                    </iframe>
                    <LoadingOverlay
                        active={this.state.spinner}
                        className="loading-component"
                        spinner
                        text='Đang tải dữ liệu...'
                    >
                    </LoadingOverlay>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default" onClick={this.handleClose.bind(this)}><i className="fa fa-remove"></i> Đóng</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
