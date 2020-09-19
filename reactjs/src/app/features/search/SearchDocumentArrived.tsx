import { Column } from 'devextreme-react/data-grid';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { Component } from 'react'
import { BigBreadcrumbs, JarvisWidget, Stats, WidgetGrid } from '../../../common';
import PrintingComponent from '../../../common/core/controls/PrintingComponent';
import columnFormatDate from '../../../common/core/functions/columnRenderDate';
import { DocumentaryType } from '../../../common/core/models/Attachment';
import { JavisWidgetDefault } from '../../../common/core/models/JavisDefault';
import DataGridCustom from '../../../common/tables/components/DataGridCustom';
import DocumentaryService from '../../../services/danhmuc/documentary/DocumentaryService';
import BreadcrumbStoreApp from '../../../stores/BreadcrumbStore';
import Stores from '../../../stores/storeIdentifier';
import DocumentView from './DocumentView';
import SearchDocument from './SearchDocument';

export interface ISearchDocumentArrivedProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class SearchDocumentArrived extends Component<ISearchDocumentArrivedProps, any> {
    dataGrid?: DataGridCustom;
    filterComponent?: SearchDocument;
    editComponent?: DocumentView;
    printingComponent?: PrintingComponent;
    store: any = DocumentaryService.GetAspNetDataSourceSearch((method: string, ajaxOptions: any) => {
        let filterData = this.filterComponent?.getData();
        ajaxOptions.data['data'] = JSON.stringify(filterData);
    });
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Tìm kiếm", "Văn bản đến"]);
        this.handleSearch = this.handleSearch.bind(this);
        this.onGridViewData = this.onGridViewData.bind(this);
        this.handlePrinting = this.handlePrinting.bind(this);
    }
    handleSearch() {
        this.dataGrid?.refresh();
    }

    onGridViewData(cellData: { data: any }) {
        let dataRow = cellData.data;
        this.editComponent?.open(dataRow);
    }
    modifiyDate(data: any, field: string) {
        if (data[field]) {
            const _date = moment(data[field], 'DD/MM/YYYY');
            if (_date.isValid()) {
                data[field] = _date.format('MM/DD/YYYY')
            }
        }
        return data;
    }
    handlePrinting() {
        let filterData = Object.assign({}, this.filterComponent?.getData());
        let fields: string[] = ['ngayBanHanhTu', 'ngayBanHanhDen', 'ngayGuiTu', 'ngayGuiDen'];
        fields.forEach(element => {
            filterData = this.modifiyDate(filterData, element);
        });
        this.printingComponent?.open({
            isPrint: false,
            url: 'search',
            params: filterData
        })
    }
    render() {
        return (
            <React.Fragment>
                <div id="content">
                    {
                        this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                            <div className="row">
                                <BigBreadcrumbs
                                    items={["Tìm kiếm", "Văn bản đến"]}
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
                                <SearchDocument type={DocumentaryType.DocumentaryArrived} onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>
                                </SearchDocument>
                                <JarvisWidget id="wid-id-search-van-ban-den" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                    <header>
                                        <span className="widget-icon">
                                            <i className="fa fa-table" />
                                        </span>
                                        <h2>Danh sách văn bản đến</h2>
                                    </header>
                                    <div>
                                        <div className="widget-body no-padding">
                                            <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                                gridName="grid-search-van-ban-den"
                                                removeButtonAdd={true}
                                                usePrint={true}
                                                onPrinting={this.handlePrinting}
                                                keyExpr="id"
                                                filterRow={{ visible: false }}
                                                customEditing={false}
                                                dataSource={this.store}
                                                selectionMode="none"
                                                //onSelectionChanged={(e: any) => console.log(e)}
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
                                                    caption="Số đến"
                                                    dataType="string"
                                                />
                                                <Column
                                                    dataField="code"
                                                    caption="Ký hiệu"
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
                                                    caption="Tóm tắt"
                                                    dataType="string"
                                                />
                                                <Column
                                                    dataField="documentTypeId_Name"
                                                    caption="Loại văn bản"
                                                    dataType="string"
                                                    visible={true}
                                                />
                                                <Column
                                                    dataField="agencyIssuedId_Name"
                                                    caption="Nơi ban hành"
                                                    dataType="string"
                                                />
                                                <Column
                                                    dataField="signer"
                                                    caption="Người ký"
                                                    dataType="string"
                                                />
                                                <Column
                                                    dataField="receivedDate"
                                                    caption="Ngày nhận"
                                                    dataType="datetime"
                                                    format="dd/MM/yyyy"
                                                    cellRender={columnFormatDate}
                                                />
                                                <Column
                                                    dataField="receivedBy"
                                                    caption="Người nhận"
                                                    dataType="string"
                                                />
                                                <Column
                                                    dataField="performancePerson"
                                                    caption="Người thực hiện"
                                                    dataType="string"
                                                    visible={false}
                                                />
                                                <Column
                                                    dataField="description"
                                                    caption="Ghi chú"
                                                    dataType="string"
                                                    visible={false}
                                                />
                                                <Column
                                                    dataField="isProcessed"
                                                    caption="Đã xử lý"
                                                    dataType="boolean"
                                                    width={70}
                                                    visible={true}
                                                />
                                                <Column
                                                    width={50}
                                                    alignment="center"
                                                    cellRender={(cellData: any) => {
                                                        return (
                                                            <React.Fragment>
                                                                <button type="button" title="Xem thông tin văn bản" onClick={this.onGridViewData.bind(this, cellData)} className="btn-sm btn btn-link btn-grid-func"><i className="fa fa-eye"></i></button>
                                                            </React.Fragment>
                                                        );
                                                    }}
                                                    type="buttons"
                                                />
                                            </DataGridCustom>
                                        </div>
                                    </div>
                                </JarvisWidget>
                            </article>
                        </div>
                    </WidgetGrid>
                </div>
                <DocumentView type={DocumentaryType.DocumentaryArrived} ref={ref => this.editComponent = ref || undefined}>

                </DocumentView>
                <PrintingComponent ref={ref => this.printingComponent = ref || undefined}></PrintingComponent>
            </React.Fragment>
        )
    }
}