import { Column } from 'devextreme-react/data-grid';
import moment from 'moment';
import React, { Component } from 'react'
import { BigBreadcrumbs, JarvisWidget, WidgetGrid } from '../../../common';
import columnFormatDate from '../../../common/core/functions/columnRenderDate';
import { JavisWidgetDefault } from '../../../common/core/models/JavisDefault';
import DataGridCustom from '../../../common/tables/components/DataGridCustom';
import DocumentaryService from '../../../services/danhmuc/documentary/DocumentaryService';
import BookCommonFilter from './BookCommonFilter';

export default class BookDocumentAway extends Component<any, any> {
    dataGrid?: DataGridCustom;
    filterComponent?: BookCommonFilter;
    store: any = DocumentaryService.GetAspNetDataSourceBook((method: string, ajaxOptions: any) => {
        let filterData = this.filterComponent?.getData();
        ajaxOptions.data['data'] = JSON.stringify(filterData);
    });
    constructor(props: any) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch() {
        this.dataGrid?.refresh();
    }
    render() {
        return (
            <div id="content">
                <div className="row">
                    <BigBreadcrumbs
                        items={["Danh mục", "Văn bản đi"]}
                        icon="fa fa-fw fa-table"
                    />
                    {/* <Stats /> */}
                </div>

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
                                        <BookCommonFilter onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>

                                        </BookCommonFilter>
                                        <DataGridCustom ref={ref => { console.log(ref); this.dataGrid = ref || undefined }}
                                            gridName="grid-so-van-ban-di"
                                            removeButtonAdd={true}
                                            keyExpr="id"
                                            filterRow={{ visible: false }}
                                            customEditing={false}
                                            dataSource={this.store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                            searchPanel={{ visible: false }}
                                        >
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
                                        </DataGridCustom>
                                    </div>
                                </div>
                            </JarvisWidget>
                        </article>
                    </div>
                </WidgetGrid>

            </div>

        )
    }
}
