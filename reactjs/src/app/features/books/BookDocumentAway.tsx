import { Template } from 'devextreme-react/core/template';
import { Column } from 'devextreme-react/data-grid';
import { dxElement } from 'devextreme/core/element';
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

export interface IBookDocumentAwayProps {
    breadcrumbStore?: BreadcrumbStoreApp,
    sessionStore?: SessionStore
}

@inject(Stores.BreadcrumbStore, Stores.SessionStore)
@observer
export default class BookDocumentAway extends Component<IBookDocumentAwayProps, any> {
    dataGrid?: DataGridCustom;
    filterComponent?: BookCommonFilter;
    printingComponent?: PrintingComponent;
    store: any = DocumentaryService.GetAspNetDataSourceBook((method: string, ajaxOptions: any) => {
        let filterData = this.filterComponent?.getData();
        ajaxOptions.data['data'] = JSON.stringify(filterData);
    });
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Sổ văn bản", "Văn bản đi"]);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleToolbarPreparing = this.handleToolbarPreparing.bind(this);
        this.toolbarSearchRenderer = this.toolbarSearchRenderer.bind(this);
        this.handlePrinting = this.handlePrinting.bind(this);
    }
    handleSearch() {
        this.dataGrid?.refresh();
    }
    handleToolbarPreparing(e: { component?: any, element?: dxElement, model?: any, toolbarOptions?: dxToolbarOptions }) {
        e.toolbarOptions?.items?.forEach(item => item.location = 'after');
        e.toolbarOptions?.items?.unshift({
            location: 'before',
            template: "searchTemplate"
        })
    }
    toolbarSearchRenderer() {
        return (
            <BookCommonFilter type={DocumentaryType.DocumentaryAway} onPrint={this.handlePrinting} useTemplate={true} onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>

            </BookCommonFilter>
        );
    }
    handlePrinting() {
        let filterData = Object.assign({}, this.filterComponent?.getData(), {
            id: this.props.sessionStore?.currentLogin.user.id
        });

        this.printingComponent?.open({
            isPrint: false,
            url: 'book',
            params: filterData
        })
    }
    render() {
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Sổ", "Sổ văn bản đi"]}
                                icon="fa fa-fw fa-table"
                            />
                            {
                                this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                                    <Stats />
                                ) : null
                            }
                        </div>
                    ) : null
                }
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget id="wid-id-list-van-ban-di" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách văn bản đi</h2>
                                </header>
                                <div>

                                    <div className="widget-body no-padding">

                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-so-van-ban-di"
                                            removeButtonAdd={true}
                                            usePrint={true}
                                            onPrinting={this.handlePrinting}
                                            keyExpr="id"
                                            filterRow={{ visible: false }}
                                            onToolbarPreparing={this.handleToolbarPreparing}
                                            customEditing={false}
                                            dataSource={this.store}
                                            selectionMode="none"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                            searchPanel={{ visible: false }}
                                        >
                                            <Column
                                                caption="STT"
                                                dataType="string"
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
                                            />
                                            <Column
                                                dataField="code"
                                                caption="Số văn bản"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="releaseDate"
                                                caption="Ngày ban hành"
                                                dataType="datetime"
                                                format="dd/MM/yyyy"
                                                cellRender={columnFormatDate}
                                            />
                                            <Column
                                                dataField="summaryContent"
                                                caption="Trích yếu"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="documentTypeId_Name"
                                                caption="Loại văn bản"
                                                dataType="string"
                                                visible={false}
                                            />
                                            <Column
                                                dataField="agencyIssuedId_Name"
                                                caption="Nơi ban hành"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="receivedDate"
                                                caption="Ngày gửi"
                                                dataType="datetime"
                                                format="dd/MM/yyyy"
                                                cellRender={columnFormatDate}
                                            />
                                            <Column
                                                dataField="receivedBy"
                                                caption="Người gửi"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="performancePerson"
                                                caption="Nơi nhận"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="description"
                                                caption="Ghi chú"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="isProcessed"
                                                caption="Đã xử lý"
                                                dataType="boolean"
                                                visible={false}
                                            />
                                            <Template name="searchTemplate" render={this.toolbarSearchRenderer}></Template>
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
