import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Stores from "../../../../stores/storeIdentifier";
import { Column } from 'devextreme-react/data-grid';
import DocumentTypeService from '../../../../services/danhmuc/document-type/DocumentTypeService';
import { JarvisWidget, WidgetGrid, Stats, BigBreadcrumbs } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import DocumentTypeEditComponent from './DocumentTypeEditComponent';
import { CreateDocumentTypeDto } from '../../../../services/danhmuc/document-type/dto/CreateDocumentTypeDto';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';

const store: any = DocumentTypeService.GetAspNetDataSource();

export interface IDocumentTypeProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore, Stores.AccountStore, Stores.AuthenticationStore, Stores.SessionStore)
@observer
export default class DocumentTypeComponent extends Component<IDocumentTypeProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: DocumentTypeEditComponent;
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Danh mục", "Loại văn bản"]);
    }

    componentDidMount() {

    }
    onGridEditData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        this.editComponent?.edit(dataRow.id, dataRow);
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa loại văn bản");
        result.then(res => {
            if (res) {
                DocumentTypeService.delete(dataRow.id).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }

    handleAdNewRow() {
        let createItem: CreateDocumentTypeDto = new CreateDocumentTypeDto();
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            DocumentTypeService.update(model).then(res => {
                notify('', `Cập nhật loại văn bản thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            DocumentTypeService.create(model).then(res => {
                notify('', `Thêm mới loại văn bản thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        }
    }

    render() {
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Danh mục", "Loại văn bản"]}
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
                            <JarvisWidget id="wid-id-list-loai-van-ban" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách loại văn bản</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-loai-van-ban"
                                            onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                                            keyExpr="id"
                                            customEditing={false}
                                            dataSource={store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                        >
                                            <Column
                                                dataField="code"
                                                caption="Mã"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="name"
                                                caption="Tên"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="description"
                                                caption="Ghi chú"
                                                dataType="string"
                                            />
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
                <DocumentTypeEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></DocumentTypeEditComponent>

            </div>

        )
    }
}
