import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Stores from "../../../../stores/storeIdentifier";
import LoginModel from '../../../../models/Login/loginModel';
import { PagedTenantResultRequestDto } from '../../../../services/tenant/dto/PagedTenantResultRequestDto'
import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { GetAllTenantOutput } from '../../../../services/tenant/dto/getAllTenantOutput';
import { BenhvienClient } from '../../../../services/nswag/axios-service';
import AppConsts from '../../../../lib/appconst';
import http from '../../../../services/httpService';
import BenhVienService from '../../../../services/danhmuc/benh-vien/BenhVienService';
import DataGrid, { Column, Paging, Pager, Editing } from 'devextreme-react/data-grid';
import DocumentTypeService from '../../../../services/danhmuc/document-type/DocumentTypeService';
import { JarvisWidget, WidgetGrid, Stats, BigBreadcrumbs } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';

const store: any = DocumentTypeService.GetAspNetDataSource();

@inject('storeapp', Stores.AccountStore, Stores.AuthenticationStore, Stores.SessionStore)
@observer
export default class DocumentTypeComponent extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        DocumentTypeService.getPaging(0, 10).then((res: any) => {
            console.log(res);
        })
    }

    render() {
        return (
            <div id="content">
                <div className="row">
                    <BigBreadcrumbs
                        items={["Danh mục", "Loại văn bản"]}
                        icon="fa fa-fw fa-table"

                    />
                    <Stats />
                </div>
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget id="wid-id-0" editbutton={false} color="darken" refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách loại văn bản</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom
                                            gridName="grid-loai-van-ban"
                                            keyExpr="id"
                                            customEditing={true}
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
