import { SelectBox } from 'devextreme-react';
import { Template } from 'devextreme-react/core/template';
import { Column, Summary, TotalItem } from 'devextreme-react/data-grid';
import { dxElement } from 'devextreme/core/element';
import dxDataGrid from 'devextreme/ui/data_grid';
import { dxToolbarOptions } from 'devextreme/ui/toolbar';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react'
import { BigBreadcrumbs, JarvisWidget, Stats, WidgetGrid } from '../../../common';
import PrintingComponent from '../../../common/core/controls/PrintingComponent';
import columnFormatDate from '../../../common/core/functions/columnRenderDate';
import { DocumentaryType } from '../../../common/core/models/Attachment';
import { JavisWidgetDefault } from '../../../common/core/models/JavisDefault';
import DataGridCustom from '../../../common/tables/components/DataGridCustom';
import DocumentaryService from '../../../services/danhmuc/documentary/DocumentaryService';
import BreadcrumbStoreApp from '../../../stores/BreadcrumbStore';
import SessionStore from '../../../stores/sessionStore';
import Stores from '../../../stores/storeIdentifier';
import BookCommonFilter from './BookCommonFilter';

declare var $: any;

export interface IBookDocumentInternalProps {
    breadcrumbStore?: BreadcrumbStoreApp,
    sessionStore?: SessionStore
}

@inject(Stores.BreadcrumbStore, Stores.SessionStore)
@observer
export default class BookDocumentInternal extends Component<IBookDocumentInternalProps, any> {
    dataGrid?: DataGridCustom;
    filterComponent?: BookCommonFilter;
    printingComponent?: PrintingComponent;
    store: any = DocumentaryService.GetAspNetDataSourceBook((method: string, ajaxOptions: any) => {
        let filterData = this.filterComponent?.getData();
        //let filterData = this.state.filterData;
        ajaxOptions.data['data'] = JSON.stringify(filterData);
    });
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Sổ văn bản", "Văn bản nội bộ"]);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleToolbarPreparing = this.handleToolbarPreparing.bind(this);
        this.toolbarSearchRenderer = this.toolbarSearchRenderer.bind(this);
        this.handlePrinting = this.handlePrinting.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        // this.state = {
        //     filterData: {
        //         year: new Date().getFullYear(),
        //         type: DocumentaryType.DocumentaryInternal
        //     }
        // }
    }
    handleSearch() {
        this.dataGrid?.refresh();
    }

    getYears() {
        const _year = new Date().getFullYear();
        let source = [];
        for (let index = _year; index >= _year - 20; index--) {
            source.push({ value: index, text: index });
        }
        return source;
    }

    handleYearChange(e: any) {
        let { filterData } = this.state;
        filterData.year = e.value;
        this.setState(filterData);
    }

    handleToolbarPreparing(e: { component?: any, element?: dxElement, model?: any, toolbarOptions?: dxToolbarOptions }) {
        e.toolbarOptions?.items?.forEach(item => item.location = 'after');

        e.toolbarOptions?.items?.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                icon: 'search',
                text: 'Tìm kiếm',
                onClick: this.handleSearch
            }
        })
        e.toolbarOptions?.items?.unshift({
            location: 'before',
            template: "searchTemplate"
        })
    }
    toolbarSearchRenderer() {
        return (
            <div className="dx-field">
                <div className="dx-field-label" style={{ width: 'auto' }}>Năm</div>
                <SelectBox
                    items={this.getYears()}
                    displayExpr="text"
                    style={{ width: '100px' }}
                    valueExpr="value"
                    value={this.state.filterData.year}
                    className="dx-field-value"
                    onValueChanged={this.handleYearChange}
                ></SelectBox>
            </div>
        )
        // return (
        //     <BookCommonFilter type={DocumentaryType.DocumentaryInternal} onPrint={this.handlePrinting} useTemplate={true} onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>

        //     </BookCommonFilter>
        // );
    }
    handlePrinting() {
        //let { filterData } = this.state;
        let filterData = this.filterComponent?.getData();
        let _filterData = Object.assign({}, filterData, {
            id: this.props.sessionStore?.currentLogin.user.id
        });
        this.printingComponent?.open({
            isPrint: false,
            url: 'book',
            params: _filterData
        })
    }
    render() {
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Sổ", "Sổ văn bản nội bộ"]}
                                icon="fa fa-fw fa-table"
                            />
                            {
                                this.props.breadcrumbStore?.useStats == true ? (
                                    <Stats />
                                ) : null
                            }
                        </div>
                    ) : null
                }
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <BookCommonFilter
                                ref={ref => this.filterComponent = ref || undefined}
                                type={DocumentaryType.DocumentaryInternal}
                                useTemplate={false} onPrint={this.handlePrinting}
                                onSearch={this.handleSearch}
                            ></BookCommonFilter>
                            <JarvisWidget id="wid-id-list-van-ban-noi-bo" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách văn bản nội bộ</h2>
                                </header>
                                <div>

                                    <div className="widget-body no-padding">

                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-so-van-ban-noi-bo"
                                            removeButtonAdd={true}
                                            usePrint={true}
                                            onPrinting={this.handlePrinting}
                                            keyExpr="id"
                                            filterRow={{ visible: false }}
                                            //onToolbarPreparing={this.handleToolbarPreparing}
                                            customEditing={false}
                                            dataSource={this.store}
                                            selectionMode="none"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                            searchPanel={{ visible: false }}
                                            onContentReady={(e: { component?: dxDataGrid | undefined, element?: dxElement | undefined, model?: any }) => {
                                                $(e.element).find('.summary-footer').closest('td').attr('colspan', 5)
                                            }}
                                        >
                                            <Column
                                                caption="STT"
                                                dataType="string"
                                                width={60}
                                                fixed
                                                alignment="center"
                                                cellRender={(celldata: any) => {
                                                    let rowIndex = celldata['rowIndex'];
                                                    let pageIndex = celldata.component.pageIndex();
                                                    let pageSize = celldata.component.pageSize();
                                                    return (pageIndex * pageSize) + (rowIndex + 1);
                                                }}
                                            />
                                            <Column
                                                dataField="textNumber"
                                                caption="Số đi"
                                                dataType="string"
                                                width={80}
                                                fixed
                                            />
                                            <Column
                                                dataField="code"
                                                caption="Số văn bản"
                                                dataType="string"
                                                width={100}
                                                fixed
                                            />
                                            <Column
                                                dataField="documentTypeId_Name"
                                                caption="Loại văn bản"
                                                dataType="string"
                                                width={150}
                                            />
                                            <Column
                                                dataField="releaseDate"
                                                caption="Ngày ban hành"
                                                dataType="datetime"
                                                width={100}
                                                format="dd/MM/yyyy"
                                                cellRender={columnFormatDate}
                                            />
                                            <Column
                                                dataField="summaryContent"
                                                caption="Nội dung tóm tắt"
                                                dataType="string"
                                                minWidth={250}
                                            />
                                            {/* <Column
                                                dataField="documentTypeId_Name"
                                                caption="Loại văn bản"
                                                dataType="string"
                                                visible={false}
                                            /> */}
                                            <Column
                                                dataField="agencyIssuedId_Name"
                                                caption="Nơi ban hành"
                                                dataType="string"
                                                width={200}
                                            />
                                            <Column
                                                dataField="receivedDate"
                                                caption="Ngày gửi"
                                                dataType="datetime"
                                                width={100}
                                                format="dd/MM/yyyy"
                                                cellRender={columnFormatDate}
                                            />
                                            <Column
                                                dataField="receivedBy"
                                                caption="Người gửi"
                                                dataType="string"
                                                width={150}
                                            />
                                            <Column
                                                dataField="performancePerson"
                                                caption="Nơi nhận"
                                                dataType="string"
                                                width={200}
                                            />
                                            <Column
                                                dataField="description"
                                                caption="Ghi chú"
                                                dataType="string"
                                                minWidth={150}
                                            />
                                            <Column
                                                dataField="isProcessed"
                                                caption="Đã xử lý"
                                                dataType="boolean"
                                                visible={false}
                                            />
                                            <Template name="searchTemplate" render={this.toolbarSearchRenderer}></Template>
                                            <Summary >
                                                <TotalItem
                                                    column="textNumber"
                                                    summaryType="count"
                                                    displayFormat={'Tổng số: {0} văn bản'}
                                                    showInColumn="textNumber" cssClass="summary-footer"
                                                    alignment="left"
                                                />
                                            </Summary>
                                        </DataGridCustom>
                                    </div>
                                </div>
                            </JarvisWidget>
                        </article>
                    </div>
                </WidgetGrid>
                <PrintingComponent ref={ref => this.printingComponent = ref || undefined}></PrintingComponent>
            </div>

        )
    }
}
