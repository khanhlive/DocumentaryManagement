import React, { Component } from 'react'
import CommonSelect from '../../../common/core/controls/CommonSelect';
import { ApprovedType } from '../../../lib/ApprovedType';
import userService from '../../../services/user/userService';
import DepartmentService from '../../../services/danhmuc/department/DepartmentService';

export interface IApprovedProps {
    onChange: (fieldName: string, selectedItem: any, approvedType: number) => any,
    onApprovedChange: (fieldName: string, approvedType: number) => any,
    fieldName: string,
    value?: any,
    label?: string,
    readOnly?: boolean,
    approvedType: any
}
export interface IApprovedStates {
    options: Array<any>,
    value?: any,
    label?: any,
    approvedType?: any
}

export default class ApprovedSelect extends Component<IApprovedProps, IApprovedStates> {
    slApprovedType?: HTMLSelectElement;
    slApproved?: CommonSelect;
    static defaultProps = {
        onChange: () => { },
        onApprovedChange: () => { }
    }
    constructor(props: any) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectApprovedChange = this.handleSelectApprovedChange.bind(this);
        this.state = {
            options: [],
            value: this.props.value,
            label: this.props.label,
            approvedType: this.props.approvedType
        }
    }

    componentDidMount() {
        this.refresh(this.state.approvedType);
    }

    handleSelectChange(fieldName: string, selectedItem: any, approvedType: number) {
        this.setState({
            value: selectedItem?.value,
            label: selectedItem?.label
        })
        if (this.props.onChange) {
            let _type = this.slApprovedType?.value || '';
            this.props.onChange(fieldName, selectedItem, parseInt(_type));
        }
    }

    public handleSelectApprovedChange(e: any) {
        let value = e.target.value;
        this.refresh(value);
        this.setState({
            approvedType: value,
        });
        this.slApproved?.clearValue();
        if (this.props.onApprovedChange) {
            this.props.onApprovedChange("approvedType", parseInt(value));
        }
    }

    refresh(approvedType: number) {
        let req;
        //console.log("approvedType", JSON.stringify(approvedType));
        if (approvedType == ApprovedType.Department) {
            req = DepartmentService.getDepartmentForApproved();
        } else {
            req = userService.getUserForApproved();
        }
        req.then((res: any) => {
            let source = res.map((p: any) => {
                return {
                    value: p.id,
                    label: p.name
                }
            });
            this.setState({
                options: source
            });
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="input-group">
                    <CommonSelect ref={ref => this.slApproved = ref || undefined}
                        value={this.state.value}
                        readOnly={this.props.readOnly}
                        label={this.state.label}
                        options={this.state.options}
                        fieldName={this.props.fieldName}
                        onChange={this.handleSelectChange}
                    >
                    </CommonSelect>
                    <span className="input-group-addon" style={{ padding: 0 }}>
                        <select ref={ref => this.slApprovedType = ref || undefined}
                            name="approvedType"
                            id="approvedType"

                            onChange={this.handleSelectApprovedChange}
                            value={this.state.approvedType}
                            className="form-control select-control"
                        >
                            <option disabled={this.props.readOnly} value={ApprovedType.Personal}>Cá nhân</option>
                            <option disabled={this.props.readOnly} value={ApprovedType.Department}>Phòng/ban</option>
                        </select>
                    </span>
                </div>
            </React.Fragment>
        )
    }
}
