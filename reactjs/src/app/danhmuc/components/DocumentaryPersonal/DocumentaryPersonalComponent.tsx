import React, { Component } from 'react'
import { Column } from 'devextreme-react/data-grid';
import DocumentaryPersonalService from '../../../../services/danhmuc/documentary-personal/DocumentaryPersonalService';
import { JarvisWidget, WidgetGrid, Stats, BigBreadcrumbs } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import CreateDocumentaryPersonalDto from '../../../../services/danhmuc/documentary-personal/dto/CreateDocumentaryPersonalDto';
import DocumentaryPersonalEditComponent from './DocumentaryPersonalEditComponent';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../../../stores/storeIdentifier';
import ConfigService from '../../../../services/danhmuc/config/ConfigService';
import { formatDate } from '../../../../common/core/functions/columnRenderDate';

const store: any = DocumentaryPersonalService.GetAspNetDataSource();

export interface IDocumentaryPersonalProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class DocumentaryPersonalComponent extends Component<IDocumentaryPersonalProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: DocumentaryPersonalEditComponent;
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Quản lý", "Văn bản cá nhân"]);
    }

    componentDidMount() {

    }
    onGridEditData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        this.editComponent?.edit(dataRow.id, dataRow);
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa văn bản cá nhân");
        result.then(res => {
            if (res) {
                DocumentaryPersonalService.delete(dataRow.id).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }

    handleAdNewRow() {
        let createItem: CreateDocumentaryPersonalDto = new CreateDocumentaryPersonalDto();
        createItem.agencyIssuedId = ConfigService.getCacheField('agencyIssuedId');
        createItem['agencyIssuedId_Name'] = ConfigService.getCacheField('agencyIssuedName');
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            DocumentaryPersonalService.update(model).then(res => {
                notify('', `Cập nhật văn bản cá nhân thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            let data = Object.assign({}, model);
            DocumentaryPersonalService.create(data).then(res => {
                notify('', `Thêm mới văn bản cá nhân thành công`, 'success');
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
                                items={["Quản lý", "Văn bản cá nhân"]}
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
                            <JarvisWidget id="wid-id-list-van-ban-ca-nhan" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách văn bản cá nhân</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-van-ban-ca-nhan"
                                            onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                                            keyExpr="id"
                                            customEditing={false}
                                            dataSource={store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                        >
                                            <Column
                                                dataField="code"
                                                caption="Ký hiệu"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="name"
                                                caption="Tên"
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
                                                dataField="abridgment"
                                                caption="Trích yếu"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="creationDate"
                                                caption="Ngày tạo"
                                                dataType="datetime"
                                                format="dd/MM/yyyy"
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
                <DocumentaryPersonalEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></DocumentaryPersonalEditComponent>

            </div>

        )
    }
}

