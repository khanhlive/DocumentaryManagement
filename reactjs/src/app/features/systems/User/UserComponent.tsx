import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Column } from 'devextreme-react/data-grid';
import { confirm } from 'devextreme/ui/dialog';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import Stores from '../../../../stores/storeIdentifier';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import userService from '../../../../services/user/userService';
import notify from '../../../../common/utils/functions/notify';
import { BigBreadcrumbs, JarvisWidget, Stats, WidgetGrid } from '../../../../common';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import { CreateUserDto } from '../../../../services/user/dto/createUserInput';
import UserEditComponent from './UserEditComponent';

const store: any = userService.GetAspNetDataSource();

export interface IUserProps {
    breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
export default class UserComponent extends Component<IUserProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: UserEditComponent;
    constructor(props: any) {
        super(props);
        this.props.breadcrumbStore?.setItems(["Hệ thống", "Quản lý tài khoản"]);
    }

    componentDidMount() {

    }
    onGridEditData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        userService.get({ id: dataRow.id }).then(res => {
            this.editComponent?.edit(res.id, res);
        })
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa tài khoản");
        result.then(res => {
            if (res) {
                userService.delete({ id: dataRow.id }).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }

    handleAdNewRow() {
        let createItem: CreateUserDto = new CreateUserDto();
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        model.name = model.fullName2;
        model.surname = model.fullName2;
        if (id > 0) {
            userService.update(model).then(res => {
                notify('', `Cập nhật tài khoản thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            userService.create(model).then(res => {
                notify('', `Thêm mới tài khoản thành công`, 'success');
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
                                items={["Hệ thống", "Quản lý tài khoản"]}
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
                            <JarvisWidget id="wid-id-list-user" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách tài khoản</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-user"
                                            onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                                            keyExpr="id"
                                            customEditing={false}
                                            dataSource={store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                        >
                                            <Column
                                                dataField="userName"
                                                caption="Tên đăng nhập"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="fullName2"
                                                caption="Họ tên"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="emailAddress"
                                                caption="Email"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="phoneNumber"
                                                caption="Điện thoại"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="organization"
                                                caption="Đơn vị"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="address"
                                                caption="Địa chỉ"
                                                dataType="string"
                                            />
                                            <Column
                                                dataField="isActive"
                                                caption="Kích hoạt"
                                                dataType="boolean"
                                                width={100}
                                                cellRender={(cellData: any) => {
                                                    return (
                                                        cellData.value === true ? (
                                                            <span className="label label-success">Kích hoạt</span>
                                                        ) : (<span className="label label-danger">Ngừng kích hoạt</span>)
                                                    );
                                                }}
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
                <UserEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></UserEditComponent>

            </div>

        )
    }
}
