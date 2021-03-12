import React, { Component } from 'react'
import { Column } from 'devextreme-react/data-grid';
import DocumentaryService from '../../../../services/danhmuc/documentary/DocumentaryService';
import { JarvisWidget, WidgetGrid, BigBreadcrumbs, Stats } from '../../../../common';
import DataGridCustom from '../../../../common/tables/components/DataGridCustom';
import { confirm } from 'devextreme/ui/dialog';
import notify from '../../../../common/utils/functions/notify';
import CreateDocumentaryDto from '../../../../services/danhmuc/documentary/dto/CreateDocumentaryDto';
import EDocumentaryEditComponent from './EDocumentaryEditComponent';
import { DocumentaryType } from '../../../../common/core/models/Attachment';
import EDocumentaryFilterComponent from './EDocumentaryFilterComponent';
import { JavisWidgetDefault } from '../../../../common/core/models/JavisDefault';
import columnFormatDate, { formatDate } from '../../../../common/core/functions/columnRenderDate';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../../../stores/storeIdentifier';
import ConfigService from '../../../../services/danhmuc/config/ConfigService';
import PrintingComponent from '../../../../common/core/controls/PrintingComponent';
import { ApprovedType } from '../../../../lib/ApprovedType';
import { ApprovedDocumentDto } from '../../../../services/danhmuc/documentary/dto/ApprovedDocumentDto';
import DocumentarySendComponent from './EDocumentarySend';
import { isGranted } from '../../../../lib/abpUtility';
import { PermissionNames } from '../../../../lib/PermissionName';
import SessionStore from '../../../../stores/sessionStore';

export interface IEDocumentaryStates {

}
export interface IEDocumentaryArivedProps {
    breadcrumbStore?: BreadcrumbStoreApp,
    sessionStore?: SessionStore
}

@inject(Stores.BreadcrumbStore, Stores.SessionStore)
@observer
export default class EDocumentaryComponent extends Component<IEDocumentaryArivedProps, any> {
    dataGrid?: DataGridCustom;
    editComponent?: EDocumentaryEditComponent;
    filterComponent?: EDocumentaryFilterComponent;
    printingComponent?: PrintingComponent;
    documentSend?: DocumentarySendComponent
    constructor(props: any) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.props.breadcrumbStore?.setItems(["Quản lý", "Văn bản điện tử"]);
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
        let result = confirm("Bạn có muốn xóa bản ghi này không?", "Xóa văn bản điện tử");
        result.then(res => {
            if (res) {
                DocumentaryService.delete(dataRow.id).then(res1 => {
                    notify('Thông báo', 'Xóa dữ liệu thành công', 'success');
                    this.dataGrid?.refresh();
                })
            }
        })
    }

    handlePrinting() {
        let filterData = Object.assign({}, this.filterComponent?.getData(), { userId: this.props.sessionStore?.currentLogin.user.id });

        this.printingComponent?.open({
            isPrint: false,
            url: 'document',
            params: filterData,

        })
    }

    handleAdNewRow() {
        let createItem: CreateDocumentaryDto = new CreateDocumentaryDto();
        createItem.type = DocumentaryType.EDocumentary;

        createItem.agencyIssuedId = ConfigService.getCacheField('agencyIssuedId');
        createItem['agencyIssuedId_Name'] = ConfigService.getCacheField('agencyIssuedName');

        createItem.signer = ConfigService.getCacheField('singer');
        createItem.approvedBy = ConfigService.getCacheField('approvedBy');
        createItem.receivedBy = ConfigService.getCacheField('receivedBy');

        createItem.approvedType = ApprovedType.Personal;
        this.editComponent?.create(createItem);
    }

    handleSave(id: number, model: any) {
        if (id > 0) {
            if (model.releaseDate)
                model.releaseDate = formatDate(model.releaseDate, model.releaseDate.length > 10 ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');
            if (model.receivedDate)
                model.receivedDate = formatDate(model.receivedDate, model.receivedDate.length > 10 ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');
            if (model.updatedDate)
                model.updatedDate = formatDate(model.updatedDate, model.updatedDate.length > 10 ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');
            DocumentaryService.update(model).then(res => {
                notify('', `Cập nhật văn bản điện tử thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        } else {
            let data = Object.assign({}, model);
            DocumentaryService.create(data).then(res => {
                notify('', `Thêm mới văn bản điện tử thành công`, 'success');
                this.dataGrid?.refresh();
                this.editComponent?.handleClose();
            })
        }
    }

    hanleApproved(id: number, model: any) {
        let item: ApprovedDocumentDto = new ApprovedDocumentDto();
        item.init(model);
        DocumentaryService.approved(id, item).then(res => {
            notify('', `Duyệt văn bản điện tử thành công`, 'success');
            this.dataGrid?.refresh();
            this.editComponent?.handleClose();
        })
    }

    handleSearch() {
        this.dataGrid?.refresh();
    }

    handleSend(cellData: { data: any }) {
        let dataRow = Object.assign({}, cellData.data);
        this.documentSend?.send(dataRow.id);
    }

    handleSendSuccess(isSuccess: boolean) {
        if (isSuccess)
            this.dataGrid?.refresh();
    }

    render() {
        const allowApproved = isGranted(PermissionNames.Permission_Approved);
        const allowDocumentManager = isGranted(PermissionNames.Permission_DocumentManager);
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Quản lý", "Văn bản điện tử"]}
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

                            <EDocumentaryFilterComponent onSearch={this.handleSearch} ref={ref => this.filterComponent = ref || undefined}>

                            </EDocumentaryFilterComponent>
                            <JarvisWidget id="wid-id-list-van-ban-dien-tu" editbutton={false} color={JavisWidgetDefault.color} refresh={true}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2>Danh sách văn bản điện tử</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <DataGridCustom ref={ref => this.dataGrid = ref || undefined}
                                            gridName="grid-van-ban-dien-tu"
                                            usePrint={true}
                                            onPrinting={this.handlePrinting}
                                            onAddNewRowCustom={this.handleAdNewRow.bind(this)}
                                            keyExpr="id"
                                            customEditing={false}
                                            dataSource={this.store}
                                            selectionMode="single"
                                            onSelectionChanged={(e: any) => console.log(e)}
                                        >
                                            {
                                                !allowDocumentManager ? (
                                                    <Column
                                                        dataField="isView"
                                                        caption=""
                                                        allowFiltering={false}
                                                        dataType="string"
                                                        width={70}
                                                        cellRender={(cellData: any) => {
                                                            let isView = cellData.data.isView;
                                                            return <i title={isView ? 'Đã xem' : 'Chưa xem'} className={`fa fa-flag text-${isView ? 'success' : 'warning'}`}></i>;
                                                        }}
                                                    />
                                                ) : null
                                            }
                                            <Column
                                                dataField="textNumber"
                                                caption="Số đến"
                                                dataType="string"
                                                width={80}
                                                fixed
                                            />
                                            <Column
                                                dataField="code"
                                                caption="Ký hiệu"
                                                dataType="string"
                                                width={100}
                                                fixed
                                            />
                                            <Column
                                                dataField="releaseDate"
                                                caption="Ban hành"
                                                dataType="datetime"
                                                format="dd/MM/yyyy"
                                                cellRender={columnFormatDate}
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
                                                width={100}
                                            />
                                            <Column
                                                caption="Cá nhân/Phòng duyệt"
                                                dataType="string"
                                                width={150}
                                                cellRender={(cellData) => {

                                                    if (cellData.data.approvedType == ApprovedType.Personal) {
                                                        return cellData.data.approvedUserId_Name;
                                                    } else
                                                        if (cellData.data.approvedType == ApprovedType.Department) {
                                                            return cellData.data.approvedDepartmentId_Name;
                                                        } else return "";
                                                }}
                                            />
                                            <Column
                                                dataField="isApproved"
                                                caption="Đã duyệt"
                                                dataType="boolean"
                                                width={100}
                                            />
                                            <Column
                                                dataField="approvedContent"
                                                caption="Nội dung duyệt"
                                                dataType="string"
                                                width={150}
                                            />
                                            <Column
                                                dataField="id"
                                                caption="Chức năng"
                                                width={130}
                                                fixed
                                                fixedPosition='right'
                                                alignment="center"
                                                cellRender={(cellData: any) => {
                                                    return (
                                                        <React.Fragment>
                                                            {
                                                                allowDocumentManager ? (
                                                                    <button type="button" title="Chuyển nội bộ" onClick={this.handleSend.bind(this, cellData)} className="btn-sm btn btn-primary btn-grid-func"><i className="fa fa-send"></i></button>
                                                                ) : null
                                                            }

                                                            <button type="button" title={(allowApproved && allowDocumentManager) || (allowDocumentManager) ? "Sửa" : (allowApproved ? "Duyệt" : "Xem")} onClick={this.onGridEditData.bind(this, cellData)} className="btn-sm btn btn-info btn-grid-func">
                                                                {
                                                                    (allowApproved && allowDocumentManager) || (allowDocumentManager) ? (<i className="fa fa-pencil"></i>) : (
                                                                        allowApproved ? (<i className="fa fa-check"></i>) : (
                                                                            <i className="fa fa-eye"></i>
                                                                        )
                                                                    )
                                                                }
                                                            </button>
                                                            {
                                                                allowDocumentManager ? (
                                                                    <button type="button" title="Xóa" onClick={this.onGridDeleteData.bind(this, cellData)} className="btn-sm btn btn-danger btn-grid-func"><i className="fa fa-trash"></i></button>
                                                                ) : null
                                                            }

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
                <EDocumentaryEditComponent
                    ref={ref => this.editComponent = ref || undefined}
                    onSave={this.handleSave.bind(this)}
                    onApproved={this.hanleApproved.bind(this)}
                ></EDocumentaryEditComponent>
                <PrintingComponent ref={ref => this.printingComponent = ref || undefined}></PrintingComponent>
                <DocumentarySendComponent
                    onApproved={this.handleSendSuccess.bind(this)}
                    ref={ref => this.documentSend = ref || undefined}
                    onSave={() => { }}
                ></DocumentarySendComponent>
            </div>

        )
    }
}

