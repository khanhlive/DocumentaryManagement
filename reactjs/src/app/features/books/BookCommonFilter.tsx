import React, { Component } from 'react'
import { DocumentaryType } from '../../../common/core/models/Attachment';
export interface IBookCommonFilterProps {
    onSearch?: (filterData: any) => any
}
export default class BookCommonFilter extends Component<IBookCommonFilterProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            filterData: {
                year: new Date().getFullYear(),
                type: DocumentaryType.DocumentaryAway
            }
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch() {
        if (this.props.onSearch !== undefined) {
            this.props.onSearch(this.state.filterData);
        }
    }

    handleSelectChange(e: any) {
        let filter = this.state.filterData || {};
        let name = e.target.name;
        let value = e.target.value;
        filter[name] = value;
        this.setState({
            filterData: filter,
        });
    }

    public getData() {
        return this.state.filterData;
    }
    render() {
        const _year = new Date().getFullYear();
        let source = [];
        for (let index = _year; index >= _year - 20; index--) {
            source.push(index);
        }
        return (

            <div className="form-inline" style={{ padding: '13px' }}>
                <div className="form-group">
                    <label>Năm:&nbsp;</label>
                    <select onChange={this.handleSelectChange} name="year" className="form-control" style={{ width: '120px' }}>
                        {
                            source.map(item => {
                                return <option key={item} value={item}>{item}</option>
                            })
                        }
                    </select>

                </div>
                <button type="button" style={{ marginLeft: '10px' }} onClick={this.handleSearch} className="btn btn-primary"><i className="fa fa-search"></i>&nbsp;Tìm</button>
                <button type="button" style={{ marginLeft: '10px' }} className="btn btn-info"><i className="fa fa-print"></i>&nbsp;In</button>
            </div>
        )
    }
}
