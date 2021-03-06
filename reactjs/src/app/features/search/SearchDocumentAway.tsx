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

export interface ISearchDocumentAwayProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class SearchDocumentAway extends Component<ISearchDocumentAwayProps, any> {
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
        this.props.breadcrumbStore?.setItems(["Tìm kiếm", "Văn bản đi"]);
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
                                    items={["Tìm kiếm", "Văn bản đi"]}
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
                                <SearchDocument type={DocumentaryType.DocumentaryAway} onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>
                                </SearchDocument>
                                <JarvisWidget id="wid-id-list-search-van-ban-di" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                    <header>
                                        <span className="widget-icon">
                                            <i className="fa fa-table" />
                                        </span>
                                        <h2>Danh sách văn bản đi</h2>
                                    </header>
                                    <div>
                                        <div className="widget-body no-padding">
                                            <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                                gridName="grid-search-van-ban-di"
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
                                                    width={60}
                                                    fixed
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
                                                    caption="Ký hiệu"
                                                    dataType="string"
                                                    width={100}
                                                    fixed
                                                />
                                                <Column
                                                    dataField="releaseDate"
                                                    caption="Ngày ban hành"
                                                    dataType="datetime"
                                                    format="dd/MM/yyyy"
                                                    width={100}
                                                    cellRender={columnFormatDate}
                                                />
                                                <Column
                                                    dataField="summaryContent"
                                                    caption="Tóm tắt"
                                                    dataType="string"
                                                    minWidth={250}
                                                />
                                                <Column
                                                    dataField="documentTypeId_Name"
                                                    caption="Loại văn bản"
                                                    dataType="string"
                                                    width={150}
                                                    visible={true}
                                                />
                                                <Column
                                                    dataField="agencyIssuedId_Name"
                                                    caption="Nơi ban hành"
                                                    dataType="string"
                                                    width={150}
                                                />
                                                <Column
                                                    dataField="signer"
                                                    caption="Người ký"
                                                    dataType="string"
                                                    width={150}
                                                />
                                                <Column
                                                    dataField="receivedDate"
                                                    caption="Ngày gửi"
                                                    width={100}
                                                    dataType="datetime"
                                                    format="dd/MM/yyyy"
                                                    cellRender={columnFormatDate}
                                                />
                                                <Column
                                                    dataField="receivedBy"
                                                    caption="Người gửi"
                                                    width={150}
                                                    dataType="string"
                                                />
                                                <Column
                                                    dataField="performancePerson"
                                                    caption="Nơi nhận"
                                                    dataType="string"
                                                    visible={false}
                                                    width={150}
                                                />
                                                <Column
                                                    dataField="description"
                                                    caption="Ghi chú"
                                                    minWidth={200}
                                                    dataType="string"
                                                    visible={false}
                                                />
                                                <Column
                                                    dataField="isProcessed"
                                                    caption="Đã xử lý"
                                                    dataType="boolean"
                                                    visible={true}
                                                    width={70}
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
                <DocumentView type={DocumentaryType.DocumentaryAway} ref={ref => this.editComponent = ref || undefined}>

                </DocumentView>

                <PrintingComponent ref={ref => this.printingComponent = ref || undefined}></PrintingComponent>
            </React.Fragment>
        )
    }
}
