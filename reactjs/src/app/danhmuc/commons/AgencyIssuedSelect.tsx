import React, { Component } from 'react'
import CommonSelect from '../../../common/core/controls/CommonSelect';
import AgencyIssuedService from '../../../services/danhmuc/agency-issued/AgencyIssuedService';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { AgencyIssuedDto } from '../../../services/danhmuc/agency-issued/dto/AgencyIssuedDto';
import AgencyIssuedEditComponent from '../components/AgencyIssued/AgencyIssuedEditComponent';
import notify from '../../../common/utils/functions/notify';
import CreateAgencyIssuedDto from '../../../services/danhmuc/agency-issued/dto/CreateAgencyIssuedDto';

export interface IAgencyIssuedProps {
    onChange: (fieldName: string, selectedItem: any) => any,
    fieldName: string,
    value?: any,
    useQuickAdd?: boolean,
    label?: string,
    readOnly?: boolean
}
export interface IAgencyIssuedStates {
    options: Array<any>
}

export default class AgencyIssuedSelect extends Component<IAgencyIssuedProps, IAgencyIssuedStates> {
    editComponent?: AgencyIssuedEditComponent
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
        let createItem: CreateAgencyIssuedDto = new CreateAgencyIssuedDto();
        this.editComponent?.create(createItem);
    }
    handleSave(id: number, model: any) {
        if (id > 0) {
            AgencyIssuedService.update(model).then(res => {
                notify('', `Cập nhật cơ quan ban hành thành công`, 'success');
                this.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            AgencyIssuedService.create(model).then(res => {
                notify('', `Thêm mới cơ quan ban hành thành công`, 'success');
                this.refresh();
                this.editComponent?.handleClose();
            })
        }
    }
    refresh() {
        AgencyIssuedService.getPaging(0, 99999999).then((res: PagedResultDto<AgencyIssuedDto>) => {
            let data = res.items.map(item => { return { value: item.id, label: item.name } });
            this.setState({
                options: data
            })
        })
    }
    render() {
        let selectControl = (
            <CommonSelect readOnly={this.props.readOnly} value={this.props.value} label={this.props.label} options={this.state.options} fieldName={this.props.fieldName} onChange={this.handleSelectChange}>
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
                                    <button type='button' onClick={this.handleAdNewRow.bind(this)} className="btn btn-default"><i className="fa fa-plus"></i></button>
                                </span>
                            </div>
                            <AgencyIssuedEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)}>
                            </AgencyIssuedEditComponent>
                        </React.Fragment>
                    ) : (selectControl)
                }
            </React.Fragment>
        )
    }
}
