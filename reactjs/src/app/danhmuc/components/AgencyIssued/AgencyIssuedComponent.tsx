import React, { Component } from 'react'
import { Column } from 'devextreme-react/data-grid';
import AgencyIssuedService from '../../../../services/danhmuc/agency-issued/AgencyIssuedService';
import { JarvisWidget, WidgetGrid, Stats, BigBreadcrumbs } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import CreateAgencyIssuedDto from '../../../../services/danhmuc/agency-issued/dto/CreateAgencyIssuedDto';
import AgencyIssuedEditComponent from './AgencyIssuedEditComponent';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';

const store: any = AgencyIssuedService.GetAspNetDataSource();

export interface IAgencyIssuedStates {

}

export default class AgencyIssuedComponent extends Component<any, any> {
    dataGrid?: DataGridCustom;
    editComponent?: AgencyIssuedEditComponent;
    // constructor(props: any) {
    //     super(props);
    // }

    componentDidMount() {

    }
    onGridEditData(cellData: { data: any }) {
        let dataRow = cellData.data;
        this.editComponent?.edit(dataRow.id, dataRow);
    }
    onGridDeleteData(cellData: { data: any }) {
        let dataRow = cellData.data;
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa cơ quan ban hành");
        result.then(res => {
            if (res) {
                AgencyIssuedService.delete(dataRow.id).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }

    handleAdNewRow() {
        let createItem: CreateAgencyIssuedDto = new CreateAgencyIssuedDto();
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            AgencyIssuedService.update(model).then(res => {
                notify('', `Cập nhật cơ quan ban hành thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            AgencyIssuedService.create(model).then(res => {
                notify('', `Thêm mới cơ quan ban hành thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        }
    }

    render() {
        return (
            <div id="content">
                <div className="row">
                    <BigBreadcrumbs
                        items={["Danh mục", "Cơ quan ban hành"]}
                        icon="fa fa-fw fa-table"
                    />
                    {/* <Stats /> */}
                </div>
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget id="wid-id-list-co-quan-ban-hanh" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách cơ quan ban hành</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-co-quan-ban-hanh"
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
                <AgencyIssuedEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></AgencyIssuedEditComponent>

            </div>

        )
    }
}

