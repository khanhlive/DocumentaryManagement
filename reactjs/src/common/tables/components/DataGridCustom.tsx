import React, { Component } from 'react'
import DataGrid, { Column, Paging, Pager, IDataGridOptions, Editing } from 'devextreme-react/data-grid';
import dxDataGrid, { dxDataGridSelection } from 'devextreme/ui/data_grid';
import { dxElement } from 'devextreme/core/element';
import { dxToolbarOptions, dxToolbarItem } from 'devextreme/ui/toolbar';

export interface IDataGridOptionsCustom extends IDataGridOptions {
    selectionMode?: 'single' | 'multiple' | 'none',
    customSelection?: boolean,
    customEditing?: boolean,
    gridName?: string
}
const buttonExclude: Array<string> = [];// ['columnChooserButton'];
export default class DataGridCustom extends Component<IDataGridOptionsCustom, any> {
    dataGrid?: DataGrid = undefined;
    constructor(props: any) {
        super(props);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    }
    onSelectionChanged(e: { component?: dxDataGrid, element?: dxElement, model?: any, currentSelectedRowKeys?: Array<any>, currentDeselectedRowKeys?: Array<any>, selectedRowKeys?: Array<any>, selectedRowsData?: Array<any> }) {
        if (this.props.selectionMode == 'single') {
            let customSelection = e.component?.option("customSelection");
            if (customSelection) return;
            e.component?.option("customSelection", true);
            e.component?.selectRows(e.currentSelectedRowKeys != undefined ? e.currentSelectedRowKeys[0] : undefined, false);
            e.component?.option("customSelection", false);
        }
        if (this.props.onSelectionChanged != undefined) {
            this.props.onSelectionChanged(e)
        };
    }
    onGridRefresh() {
        this.dataGrid?.instance.refresh();
    }
    onToolbarPreparing(e: { component?: dxDataGrid, element?: dxElement, model?: any, toolbarOptions?: dxToolbarOptions }) {
        let grid = e.component;
        console.log(e.toolbarOptions?.items);
        e.toolbarOptions?.items?.forEach((item: dxToolbarItem) => {
            if (item.widget == "dxButton" && buttonExclude.indexOf(item['name']) < 0) {
                item.location = "before";
            }
        });
        e.toolbarOptions?.items?.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                icon: 'refresh',
                onClick: this.onGridRefresh.bind(this)
            }
        })
        if (this.props.onToolbarPreparing != undefined) {
            this.props.onToolbarPreparing(e)
        };
    }
    render() {
        let _selection: dxDataGridSelection = {};

        if (this.props.selectionMode != 'none') {
            _selection = {
                mode: 'multiple',
                selectAllMode: 'page',
                allowSelectAll: this.props.selectionMode == 'multiple',
                showCheckBoxesMode: 'always'
            }
        }
        const _options: IDataGridOptionsCustom = {
            showBorders: true,
            remoteOperations: true,
            rowAlternationEnabled: true,
            showRowLines: true,
            loadPanel: { text: 'Đang tải...' },
            noDataText: 'Không có dữ liệu',
            selection: _selection,
            customSelection: false,
            filterRow: { visible: true },
            searchPanel: { visible: true, width: 350, placeholder: 'Tìm kiếm...' },
            stateStoring: {
                type: 'localStorage',
                enabled: true,
                storageKey: this.props.gridName
            },
            columnChooser: {
                enabled: true,
                title: 'Chọn cột',
                mode: 'select',
                emptyPanelText: 'Không có cột nào',
            },
            columnResizingMode: 'nextColumn',
            allowColumnResizing: true,
            columnAutoWidth: true
        }
        let editing = {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            mode: 'row',
            confirmDelete: true,
            selectTextOnEditStart: true,
            useIcons: true,
        }
        const options = Object.assign({}, _options, (this.props.customEditing ? {
            editing: editing
        } : {}), this.props, {
            onSelectionChanged: this.onSelectionChanged,
            onToolbarPreparing: this.onToolbarPreparing,
            onInitialized: (e: { component: dxDataGrid, element: dxElement }) => {
                e.element?.classList.add('dx-datagrid-smart');
                if (this.props.onInitialized != undefined) {
                    this.props.onInitialized(e)
                };
            },
        })
        return (
            <DataGrid ref={ref => this.dataGrid = ref ? ref : undefined}
                {...options}
            >
                {this.props.children}

                {/* <Column type="buttons" buttons={[
                    {
                        name: 'edit'
                    },
                    {
                        name: 'delete',
                    }
                ]}
                /> */}
                {
                    this.props.customEditing == true ? (
                        <Editing {...options.editing}
                        />
                    ) : null
                }
                <Paging defaultPageSize={10} />
                <Pager
                    showPageSizeSelector={true}
                    showNavigationButtons={true}
                    visible={true}
                    allowedPageSizes={[5, 10, 25, 50, 100]}
                />
            </DataGrid>
        )
    }
}
