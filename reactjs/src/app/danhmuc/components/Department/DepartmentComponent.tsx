import React, { Component } from 'react'
import { Column } from 'devextreme-react/data-grid';
import DepartmentService from '../../../../services/danhmuc/department/DepartmentService';
import { JarvisWidget, WidgetGrid, Stats, BigBreadcrumbs } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import { CreateDepartmentDto } from '../../../../services/danhmuc/department/dto/CreateDepartmentDto';
import DepartmentEditComponent from './DepartmentEditComponent';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import Stores from '../../../../stores/storeIdentifier';
import { inject, observer } from 'mobx-react';

const store: any = DepartmentService.GetAspNetDataSource();

export interface IDepartmentProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class DepartmentComponent extends Component<IDepartmentProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: DepartmentEditComponent;
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Danh mục", "Phòng ban"]);
    }

    componentDidMount() {

    }
    onGridEditData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        this.editComponent?.edit(dataRow.id, dataRow);
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa phòng ban");
        result.then(res => {
            if (res) {
                DepartmentService.delete(dataRow.id).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }

    handleAdNewRow() {
        let createItem: CreateDepartmentDto = new CreateDepartmentDto();
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            DepartmentService.update(model).then(res => {
                notify('', `Cập nhật phòng ban thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            DepartmentService.create(model).then(res => {
                notify('', `Thêm mới phòng ban thành công`, 'success');
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
                                items={["Danh mục", "Phòng ban"]}
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
                            <JarvisWidget id="wid-id-list-phong-ban" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách phòng ban</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-phong-ban"
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
                                                caption="Mô tả"
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
                <DepartmentEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></DepartmentEditComponent>

            </div>

        )
    }
}

