import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Column } from 'devextreme-react/data-grid';
import { confirm } from 'devextreme/ui/dialog';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import Stores from '../../../../stores/storeIdentifier';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import notify from '../../../../common/utils/functions/notify';
import { BigBreadcrumbs, JarvisWidget, Stats, WidgetGrid } from '../../../../common';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import RoleEditComponent from './RoleEditComponent';
import roleService from '../../../../services/role/roleService';
import roleServiceDevextreme from '../../../../services/role/roleServiceDevextreme';
import { CreateRoleInput } from '../../../../services/role/dto/createRoleInput';

const store: any = roleServiceDevextreme.GetAspNetDataSource();

export interface IRoleProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class RoleComponent extends Component<IRoleProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: RoleEditComponent;
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Hệ thống", "Quản lý quyền"]);
    }

    componentDidMount() {

    }
    onGridEditData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        roleService.get({ id: dataRow.id }).then(res => {
            let model = res.result;
            this.editComponent?.edit(model.id, model);
        })
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa quyền");
        result.then(res => {
            if (res) {
                roleService.delete({ id: dataRow.id }).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }

    handleAdNewRow() {
        let createItem: CreateRoleInput = new CreateRoleInput();
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            roleService.update(model).then(res => {
                notify('', `Cập nhật quyền thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            roleService.create(model).then(res => {
                notify('', `Thêm mới quyền thành công`, 'success');
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
                                items={["Hệ thống", "Quản lý quyền"]}
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
                            <JarvisWidget id="wid-id-list-role" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách quyền</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-role"
                                            onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                                            keyExpr="id"
                                            customEditing={false}
                                            dataSource={store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                        >
                                            <Column
                                                dataField="name"
                                                caption="Quyền"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="displayName"
                                                caption="Tên hiển thị"
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
                <RoleEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></RoleEditComponent>

            </div>

        )
    }
}
