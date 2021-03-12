import React, { Component } from 'react'
import { Column } from 'devextreme-react/data-grid';
import DocumentaryService from '../../../../services/danhmuc/documentary/DocumentaryService';
import { JarvisWidget, WidgetGrid, Stats, BigBreadcrumbs } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import CreateDocumentaryDto from '../../../../services/danhmuc/documentary/dto/CreateDocumentaryDto';
import DocumentaryInternalEditComponent from './DocumentaryInternalEditComponent';
import { DocumentaryType } from '../../../../common/core/models/Attachment';
import DocumentaryFilterComponent from './DocumentaryInternalFilterComponent';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import columnFormatDate, { formatDate } from '../../../../common/core/functions/columnRenderDate';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../../../stores/storeIdentifier';
import ConfigService from '../../../../services/danhmuc/config/ConfigService';
import PrintingComponent from '../../../../common/core/controls/PrintingComponent';

export interface IDocumentaryStates {

}

export interface IDocumentaryProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class DocumentaryInternalComponent extends Component<IDocumentaryProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: DocumentaryInternalEditComponent;
    filterComponent?: DocumentaryFilterComponent;
    printingComponent?: PrintingComponent;
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Quản lý", "Văn bản nội bộ"]);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePrinting = this.handlePrinting.bind(this);
    }
    store: any = DocumentaryService.GetAspNetDataSource((method: string, ajaxOptions: any) => {
        let filterData = this.filterComponent?.getData();
        ajaxOptions.data['data'] = JSON.stringify(filterData);
    });

    onGridEditData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        dataRow.releaseDate = formatDate(dataRow.releaseDate, 'DD/MM/YYYY HH:mm:ss');
        dataRow.receivedDate = formatDate(dataRow.receivedDate, 'DD/MM/YYYY HH:mm:ss');
        this.editComponent?.edit(dataRow.id, dataRow);
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa văn bản nội bộ");
        result.then(res => {
            if (res) {
                DocumentaryService.delete(dataRow.id).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }
    handleAdNewRow() {
        let createItem: CreateDocumentaryDto = new CreateDocumentaryDto();
        createItem.type = DocumentaryType.DocumentaryInternal;
        createItem.agencyIssuedId = ConfigService.getCacheField('agencyIssuedId');
        createItem['agencyIssuedId_Name'] = ConfigService.getCacheField('agencyIssuedName');

        createItem.signer = ConfigService.getCacheField('singer');
        createItem.approvedBy = ConfigService.getCacheField('approvedBy');
        createItem.receivedBy = ConfigService.getCacheField('sender');
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            DocumentaryService.update(model).then(res => {
                notify('', `Cập nhật văn bản nội bộ thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            let data = Object.assign({}, model);
            DocumentaryService.create(data).then(res => {
                notify('', `Thêm mới văn bản nội bộ thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        }
    }

    handlePrinting() {
        let filterData = Object.assign({}, this.filterComponent?.getData());

        this.printingComponent?.open({
            isPrint: false,
            url: 'document',
            params: filterData
        })
    }

    handleSearch() {
        this.dataGrid?.refresh();
    }

    render() {
        const { search } = this.props['location'];
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Quản lý", "Văn bản nội bộ"]}
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

                            <DocumentaryFilterComponent onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>

                            </DocumentaryFilterComponent>
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
                                            gridName="grid-van-ban-noi-bo"
                                            usePrint={true}
                                            onPrinting={this.handlePrinting}
                                            onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                                            keyExpr="id"
                                            customEditing={false}
                                            dataSource={this.store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                        >
                                            <Column
                                                dataField="textNumber"
                                                caption="Số đi"
                                                dataType="string"
                                                fixed
                                                width={80}
                                            />
                                            <Column
                                                dataField="code"
                                                caption="Ký hiệu"
                                                dataType="string"
                                                fixed
                                                width={100}
                                            />
                                            <Column
                                                dataField="releaseDate"
                                                caption="Ban hành"
                                                dataType="datetime"
                                                format="dd/MM/yyyy"
                                                cellRender={columnFormatDate}
                                                fixed
                                                width={100}
                                            />
                                            <Column
                                                dataField="summaryContent"
                                                caption="Nội dung tóm tắt"
                                                dataType="string"
                                                minWidth={250}
                                            />
                                            <Column
                                                dataField="documentTypeId_Name"
                                                caption="Loại văn bản"
                                                dataType="string"
                                                width={150}
                                            />
                                            <Column
                                                dataField="agencyIssuedId_Name"
                                                caption="Cơ quan ban hành"
                                                dataType="string"
                                                width={200}
                                            />
                                            <Column
                                                dataField="isProcessed"
                                                caption="Đã xử lý"
                                                dataType="boolean"
                                                width={80}
                                            />
                                            {/* <Column
                                                dataField="creationDate"
                                                caption="Ngày tạo"
                                                dataType="datetime"
                                                format="dd/MM/yyyy"
                                            /> */}
                                            <Column
                                                dataField="id"
                                                caption="Chức năng"
                                                width={100}
                                                alignment="center"
                                                cellRender={(cellData: any) => {
                                                    return (
                                                        <React.Fragment>
                                                            <button type="button" onClick={this.onGridEditData.bind(this, cellData)} className="btn-sm btn btn-info btn-grid-func"><i className="fa fa-pencil"></i></button>
                                                            <button type="button" onClick={this.onGridDeleteData.bind(this, cellData)} className="btn-sm btn btn-danger btn-grid-func"><i className="fa fa-trash"></i></button>
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
                <DocumentaryInternalEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></DocumentaryInternalEditComponent>
                <PrintingComponent ref={ref => this.printingComponent = ref || undefined}></PrintingComponent>
            </div>

        )
    }
}

