import React, { Component } from 'react'
import { Column } from 'devextreme-react/data-grid';
import DocumentaryService from '../../../../services/danhmuc/documentary/DocumentaryService';
import { JarvisWidget, WidgetGrid, BigBreadcrumbs, Stats } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import CreateDocumentaryDto from '../../../../services/danhmuc/documentary/dto/CreateDocumentaryDto';
import DocumentaryArrivedEditComponent from './DocumentaryArrivedEditComponent';
import { DocumentaryType } from '../../../../common/core/models/Attachment';
import DocumentaryArrivedFilterComponent from './DocumentaryArrivedFilterComponent';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import columnFormatDate from '../../../../common/core/functions/columnRenderDate';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../../../stores/storeIdentifier';

export interface IDocumentaryStates {

}
export interface IDocumentaryArivedProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class DocumentaryArivedComponent extends Component<IDocumentaryArivedProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: DocumentaryArrivedEditComponent;
    filterComponent?: DocumentaryArrivedFilterComponent;
    constructor(props: any) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.props.breadcrumbStore?.setItems(["Danh mục", "Văn bản đến"]);
    }
    store: any = DocumentaryService.GetAspNetDataSource((method: string, ajaxOptions: any) => {
        let filterData = this.filterComponent?.getData();
        ajaxOptions.data['data'] = JSON.stringify(filterData);
    });

    onGridEditData(cellData: { data: any }) {
        let dataRow = cellData.data;
        this.editComponent?.edit(dataRow.id, dataRow);
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = cellData.data;
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa văn bản đến");
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
        createItem.type = DocumentaryType.DocumentaryArrived;
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            DocumentaryService.update(model).then(res => {
                notify('', `Cập nhật văn bản đến thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            let data = Object.assign({}, model);
            DocumentaryService.create(data).then(res => {
                notify('', `Thêm mới văn bản đến thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        }
    }

    handleSearch() {
        this.dataGrid?.refresh();
    }

    render() {
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Danh mục", "Văn bản đến"]}
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

                            <DocumentaryArrivedFilterComponent onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>

                            </DocumentaryArrivedFilterComponent>
                            <JarvisWidget id="wid-id-list-van-ban-den" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách văn bản đến</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-van-ban-den"
                                            onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                                            keyExpr="id"
                                            customEditing={false}
                                            dataSource={this.store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                        >
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
                                                caption="Ban hành"
                                                dataType="datetime"
                                                format="dd/MM/yyyy"
                                                cellRender={columnFormatDate}
                                            />
                                            <Column
                                                dataField="summaryContent"
                                                caption="Nội dung tóm tắt"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="documentTypeId_Name"
                                                caption="Loại văn bản"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="agencyIssuedId_Name"
                                                caption="Cơ quan ban hành"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="isProcessed"
                                                caption="Đã xử lý"
                                                dataType="boolean"
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
                <DocumentaryArrivedEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></DocumentaryArrivedEditComponent>

            </div>

        )
    }
}

