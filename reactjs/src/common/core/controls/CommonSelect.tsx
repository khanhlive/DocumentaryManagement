import React, { Component } from 'react'
import Select, { ControlProps, Props, CommonProps } from 'react-select';
import { State } from 'react-select/src/Select';
import { BVContext } from '../../forms/validation/BootstrapValidator';
const baseStyle = {
    option: (provided: any, state: any) => ({
        ...provided,

    }),
    menu: (provided: any, state: any) => {
        return {
            ...provided,
            borderRadius: 0,
            marginBottom: 2,
            marginTop: 4
        }
    },
    dropdownIndicator: (provided: any, state: any) => {
        return {
            ...provided,
            padding: 5
        }
    },
    indicatorSeparator: (provided: any, state: any) => {
        return {
            ...provided,
            marginBottom: 4,
            marginTop: 4
        }
    },
}
const normalStyles = {
    ...baseStyle,
    control: (provided: any, state: any) => {
        //console.log(provided)
        return {
            ...provided,
            minHeight: 32,
            borderRadius: 0
        }
    },
}
const errorStyles = {
    ...baseStyle,
    control: (provided: any, state: any) => {
        //console.log(provided)
        return {
            ...provided,
            minHeight: 32,
            borderRadius: 0,
            borderColor: '#b94a48',
            "&:hover": {
                borderColor: '#b94a48',
            }
        }
    },
}
const successStyles = {
    ...baseStyle,
    control: (provided: any, state: any) => {
        //console.log(provided)
        return {
            ...provided,
            minHeight: 32,
            borderRadius: 0,
            borderColor: '#468847',
            "&:hover": {
                borderColor: '#468847',
            }
        }
    },
}
interface IProps extends CommonProps<any> {

}
export default class CommonSelect extends Component<any, any> {
    input?: HTMLInputElement;
    instance?: Select;
    constructor(props: any) {
        super(props);
        //console.log('value', this.props.value ? this.props.value : '')
        this.state = {
            value: this.props.value ? this.props.value : ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.input?.dispatchEvent(new Event('input'));
    }

    // shouldComponentUpdate(nextProps: any) {
    //     //console.log('shouldComponentUpdate');
    //     if (nextProps['value'] !== this.state.value) {
    //         this.setState({
    //             value: this.props.value ? this.props.value : ''
    //         })
    //     }
    //     return true
    // }

    handleChange(selectedOptions: any) {
        if (selectedOptions && typeof selectedOptions === 'object') {
            this.setState({ value: selectedOptions.value }, () => {
                this.input?.dispatchEvent(new Event('input'));
            });
        } else {
            this.setState({ value: '' }, () => {
                this.input?.dispatchEvent(new Event('input'));
            });
        }
        if (this.props.onChange) {
            this.props.onChange(this.props.fieldName, selectedOptions);
        }

    }

    clearValue() {
        this.instance?.select.clearValue();
        this.setState({ value: '' }, () => {
            this.input?.dispatchEvent(new Event('input'));
        });
    }

    handleInputChange(e: any) {
    }
    render() {
        //console.log('CommonSelect rerender')
        //let defaultValue = { value: this.props.value, label: this.props.label }

        return (
            <BVContext.Consumer>
                {
                    (context: any) => {
                        let isvalid = context ? context.isValid(this.props.fieldName) : null;
                        return (
                            <React.Fragment>
                                {/* <span>{JSON.stringify(defaultValue)}</span> */}
                                <Select ref={ref => this.instance = ref || undefined}
                                    placeholder="Chọn..."
                                    styles={(isvalid == null || isvalid == undefined) ? normalStyles : (isvalid ? successStyles : errorStyles)}
                                    options={this.props.options}
                                    onChange={this.handleChange}
                                    isDisabled={this.props.readOnly}
                                    defaultValue={{ value: this.state.value, label: this.props.label }}
                                >
                                </Select>
                                {/* {context.isValid(this.props.fieldName) == undefined || context.isValid(this.props.fieldName) == null ? null : (context.isValid(this.props.fieldName) ? 'true' : 'false')} */}
                                <input ref={ref => this.input = ref || undefined} className="hidden" value={this.state.value} type='text' id={this.props.fieldName} name={this.props.fieldName} onChange={this.handleInputChange.bind(this)}></input>

                            </React.Fragment>)
                    }
                }
            </BVContext.Consumer>
        )
    }
}
