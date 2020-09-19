import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Stores from "../../../../stores/storeIdentifier";
import { Column } from 'devextreme-react/data-grid';
import ProvinceService from '../../../../services/danhmuc/province/ProvinceService';
import { JarvisWidget, WidgetGrid, Stats, BigBreadcrumbs } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import { CreateProvinceDto } from '../../../../services/danhmuc/province/dto/CreateProvinceDto';
import ProvinceEditComponent from './TinhThanhEditComponent';

const store: any = ProvinceService.GetAspNetDataSource();

export interface IProvinceProps {
  breadcrumbStore?: BreadcrumbStoreApp
}

@inject(Stores.BreadcrumbStore)
@observer
class TinhThanh extends Component<IProvinceProps, any> {
  dataGrid?: DataGridCustom;
  editComponent?: ProvinceEditComponent;
  constructor(props: any) {
    super(props);
    this.props.breadcrumbStore?.setItems(["Danh mục", "Tỉnh thành"]);
  }

  componentDidMount() {

  }
  onGridEditData(cellData: { data: any }) {
    let dataRow = Object.assign({}, cellData.data);
    this.editComponent?.edit(dataRow.id, dataRow);
  }
  onGridDeleteData(cellData: { data: any }) {
    let dataRow = Object.assign({}, cellData.data);
    let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa tỉnh thành");
    result.then(res => {
      if (res) {
        ProvinceService.delete(dataRow.id).then(() => {
          notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
          this.dataGrid?.refresh();
        })
      }
    })
  }

  handleAdNewRow() {
    let createItem: CreateProvinceDto = new CreateProvinceDto();
    this.editComponent?.create(createItem);
  }

  handleSave(id: number, model: any) {
    if (id > 0) {
      ProvinceService.update(model).then(() => {
        notify('', `Cập nhật tỉnh thành thành công`, 'success');
        this.dataGrid?.refresh();
        this.editComponent?.handleClose();
      })
    } else {
      ProvinceService.create(model).then(() => {
        notify('', `Thêm mới tỉnh thành thành công`, 'success');
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
                items={["Danh mục", "Tỉnh thành"]}
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
              <JarvisWidget id="wid-id-list-tinh-thanh" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                <header>
                  <span className="widget-icon">
                    <i className="fa fa-table" />
                  </span>
                  <h2>Danh sách tỉnh thành</h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                      gridName="grid-tinh-thanh"
                      onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                      keyExpr="id"
                      customEditing={false}
                      dataSource={store}
                      selectionMode="single"
                      onSelectionChanged={(e: any) => console.log(e)}
                    >
                      <Column
                        dataField="code"
                        caption="Mã tỉnh"
                        dataType="string"
                        width={100}
                      />
                      <Column
                        dataField="name"
                        caption="Tên tỉnh"
                        dataType="string"
                      />
                      <Column
                        dataField="description"
                        caption="Ghi chú"
                        dataType="string"
                      />
                      <Column
                        dataField="level"
                        caption="Cấp"
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
        <ProvinceEditComponent ref={ref => this.editComponent = ref || undefined} onSave={this.handleSave.bind(this)} ></ProvinceEditComponent>

      </div>

    )
  }
}

export default TinhThanh;
