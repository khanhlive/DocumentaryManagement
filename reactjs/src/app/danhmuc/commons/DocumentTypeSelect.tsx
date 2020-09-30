import React, { Component } from 'react'
import CommonSelect from '../../../common/core/controls/CommonSelect';
import DocumentTypeService from '../../../services/danhmuc/document-type/DocumentTypeService';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { DocumentTypeDto } from '../../../services/danhmuc/document-type/dto/DocumentTypeDto';
import DocumentTypeEditComponent from '../components/DocumentType/DocumentTypeEditComponent';
import notify from '../../../common/utils/functions/notify';
import { CreateDocumentTypeDto } from '../../../services/danhmuc/document-type/dto/CreateDocumentTypeDto';

export interface IDocumentTypeProps {
    onChange: (fieldName: string, selectedItem: any) => any,
    fieldName: string,
    value?: any,
    useQuickAdd?: boolean,
    label?: string,
    readOnly?: boolean
}
export interface IDocumentTypeStates {
    options: Array<any>
}

export default class DocumentTypeSelect extends Component<IDocumentTypeProps, IDocumentTypeStates> {
    editComponent?: DocumentTypeEditComponent
    static defaultProps = {
        onChange: (fieldName: string, selectedItem: any) => { },
        useQuickAdd: false
    }
    constructor(props: any) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {
            options: []
        }
    }
    componentDidMount() {
        this.refresh();
    }
    handleSelectChange(fieldName: string, selectedItem: any) {
        if (this.props.onChange) {
            this.props.onChange(fieldName, selectedItem);
        }
    }
    handleAdNewRow() {
        let createItem: CreateDocumentTypeDto = new CreateDocumentTypeDto();
        this.editComponent?.create(createItem);
    }
    handleSave(id: number, model: any) {
        if (id > 0) {
            DocumentTypeService.update(model).then(res => {
                notify('', `Cập nhật loại văn bản thành công`, 'success');
                this.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            DocumentTypeService.create(model).then(res => {
                notify('', `Thêm mới loại văn bản thành công`, 'success');
                this.refresh();
                this.editComponent?.handleClose();
            })
        }
    }
    refresh() {
        DocumentTypeService.getPaging(0, 99999999).then((res: PagedResultDto<DocumentTypeDto>) => {
            let data = res.items.map(item => { return { value: item.id, label: item.name } });
            this.setState({
                options: data
            })
        })
    }
    render() {
        let selectControl = (
            <CommonSelect
                readOnly={this.props.readOnly}
                value={this.props.value}
                label={this.props.label}
                options={this.state.options}
                fieldName={this.props.fieldName}
                onChange={this.handleSelectChange}
            >
            </CommonSelect>
        );
        return (
            <React.Fragment>
                {
                    (this.props.useQuickAdd === true && this.props.readOnly !== true) ? (
                        <React.Fragment>
                            <div className="input-group">
                                {selectControl}
                                <span className="input-group-btn">
                                    <button
                                        type='button'
                                        onClick={this.handleAdNewRow.bind(this)}
                                        className="btn btn-default">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </span>
                            </div>
                            <DocumentTypeEditComponent
                                ref={ref => this.editComponent = ref || undefined}
                                onSave={this.handleSave.bind(this)}
                            >
                            </DocumentTypeEditComponent>
                        </React.Fragment>
                    ) : (selectControl)
                }

            </React.Fragment>
        )
    }
}
