import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import notify from '../../../../common/utils/functions/notify';
import DepartmentService from '../../../../services/danhmuc/department/DepartmentService';
import { TreeView, } from 'devextreme-react';
import { TreeList, Selection, Column } from 'devextreme-react/tree-list';
import dxTreeView from 'devextreme/ui/tree_view';
import { dxElement } from 'devextreme/core/element';
import { CreateRotationDto } from '../../../../services/danhmuc/rotation/dto/CreateRotationDto';
import RotationService from '../../../../services/danhmuc/rotation/RotationService';
import dxTreeList from 'devextreme/ui/tree_list';
import columnFormatDate from '../../../../common/core/functions/columnRenderDate';

export interface IDocumentarySendProps {
    id?: any,
    onSave: (id: number, model: any) => any,
    onApproved?: (isSuccess: boolean) => any
}
export interface IDocumentarySendState {
    isShow: boolean,
    model: any,
    id: any,
    treeViewData: any[],
    selectedItems?: any[],
    treeListData?: any[],
    selectedRowKeys?: [],
    selectedRowData?: []
}

export default class DocumentarySendComponent extends Component<IDocumentarySendProps, IDocumentarySendState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            model: {},
            id: this.props.id,
            treeViewData: [],
            selectedItems: [],
            treeListData: [],
            selectedRowKeys: [],
            selectedRowData: []
            //isEdit: false,
        }
        this.handleTreeViewSelected = this.handleTreeViewSelected.bind(this);
        this.handleTreeListSelected = this.handleTreeListSelected.bind(this);
    }

    onSubmit(e: any) {
        e.preventDefault();

        if (this.props.onSave !== undefined) {
            this.props.onSave(this.state.id || 0, this.state.model);
        }
    }

    public send(id: any) {
        // DepartmentService.getDepartmentUserTreeViewData(id).then(res => {
        //     this.setState({
        //         treeViewData: res,
        //         isShow: true,
        //         id: id,
        //     });
        // })
        DepartmentService.getDepartmentUserTreeListData(id).then(res => {
            let _selectedRowData = res.filter((item: any) => item.selected);
            let _selectedRowKeys = _selectedRowData.map((item: any) => item.id);
            this.setState({
                treeListData: res.map((item: any) => { item.isView = item.isView == true; return item; }),
                isShow: true,
                id: id,
                selectedRowKeys: _selectedRowKeys,
                selectedRowData: _selectedRowData
            });
        })
    }
    handleSave() {
        let input: CreateRotationDto = new CreateRotationDto();
        input.init({
            documentId: this.state.id,
            items: this.state.selectedRowData
        })
        RotationService.send(input).then(() => {
            notify('', `Chuyển văn bản điện tử thành công`, 'success');
            if (this.props.onApproved) {
                this.props.onApproved(true);
            }
            this.setState({
                isShow: false
            })

        })
    }

    handleTreeViewSelected(e: { component?: dxTreeView, element?: dxElement, model?: any }) {
        var selectedItems = e.component?.getSelectedNodes();
        this.setState({
            selectedItems: selectedItems?.map(p => p.itemData)
        })
    }

    handleClose() {
        this.setState({
            isShow: false
        });
    }

    handleTreeListSelected(e: { component?: dxTreeList, element?: dxElement, model?: any, currentSelectedRowKeys?: Array<any>, currentDeselectedRowKeys?: Array<any>, selectedRowKeys?: Array<any>, selectedRowsData?: Array<any> }) {
        this.setState({
            selectedRowData: e.selectedRowsData as [],
            selectedRowKeys: e.selectedRowKeys as []
        })
    }

    render() {

        return (
            <Modal show={this.state.isShow} onHide={() => this.setState({ isShow: false })} dialogClassName="" autoFocus={true}>

                <Modal.Header closeButton>
                    <Modal.Title>Chuyển văn bản nội bộ</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <fieldset>
                        <legend>Chọn phòng ban\ nhân viên cần chuyển văn bản</legend>
                        <section>

                            {/* <TreeView
                                id="treeview"
                                //ref={ref=> this.treeViewRef}
                                items={this.state.treeViewData}
                                selectNodesRecursive={true}
                                selectByClick={true}
                                showCheckBoxesMode="normal"
                                selectionMode="multiple"
                                onSelectionChanged={this.handleTreeViewSelected}
                                itemRender={(item: any) => `${item.name}`}
                            /> */}

                            <TreeList
                                id="TreeList"
                                dataSource={this.state.treeListData}
                                showRowLines={true}
                                showBorders={true}
                                columnAutoWidth={true}
                                autoExpandAll={true}
                                selectedRowKeys={this.state.selectedRowKeys}
                                keyExpr="id"
                                parentIdExpr="parrentExpr"
                                onSelectionChanged={this.handleTreeListSelected}
                            >
                                <Selection recursive={true} mode="multiple" />
                                <Column dataField="name" caption="Tất cả" />
                                <Column dataField="isView" caption="Đã xem" />
                                <Column width={150} dataField="viewDate" dataType="date" caption="Ngày xem" cellRender={(cellData: any) => columnFormatDate(cellData, 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY HH:mm')} />
                            </TreeList>
                        </section>
                    </fieldset>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-info" onClick={this.handleSave.bind(this)}><i className="fa fa-save"></i> Lưu lại</button>
                    <button type="button" className="btn btn-default" onClick={this.handleClose.bind(this)}><i className="fa fa-remove"></i> Đóng</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
