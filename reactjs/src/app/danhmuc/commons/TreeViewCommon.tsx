import React, { Component } from 'react';
import TreeView from 'devextreme-react/tree-view';


function renderTreeViewItem(item: any) {
    return `${item.fullName} (${item.position})`;
}

const employees = [{
    id: 1,
    fullName: 'John Heart',
    prefix: 'Dr.',
    position: 'CEO',
    expanded: true,
    items: [{
        id: 2,
        fullName: 'Samantha Bright',
        prefix: 'Dr.',
        position: 'COO',
        expanded: true,
        items: [{
            id: 3,
            fullName: 'Kevin Carter',
            prefix: 'Mr.',
            position: 'Shipping Manager',
        }, {
            id: 14,
            fullName: 'Victor Norris',
            prefix: 'Mr.',
            selected: true,
            position: 'Shipping Assistant'
        }]
    }, {
        id: 4,
        fullName: 'Brett Wade',
        prefix: 'Mr.',
        position: 'IT Manager',
        expanded: true,
        items: [{
            id: 5,
            fullName: 'Amelia Harper',
            prefix: 'Mrs.',
            position: 'Network Admin'
        }, {
            id: 6,
            fullName: 'Wally Hobbs',
            prefix: 'Mr.',
            position: 'Programmer'
        }, {
            id: 7,
            fullName: 'Brad Jameson',
            prefix: 'Mr.',
            position: 'Programmer'
        }, {
            id: 8,
            fullName: 'Violet Bailey',
            prefix: 'Ms.',
            position: 'Jr Graphic Designer',
        }]
    }, {
        id: 9,
        fullName: 'Barb Banks',
        prefix: 'Mrs.',
        position: 'Support Manager',
        expanded: true,
        items: [{
            id: 10,
            fullName: 'Kelly Rodriguez',
            prefix: 'Ms.',
            position: 'Support Assistant'
        }, {
            id: 11,
            fullName: 'James Anderson',
            prefix: 'Mr.',
            position: 'Support Assistant'
        }]
    }]
}];

export default class TreeViewCommon extends Component<any, any> {
    treeViewRef?: any;
    constructor(props: any) {
        super(props);
        this.treeViewRef = React.createRef();
        this.state = {
            employees,
            selectedEmployees: [],
            selectNodesRecursive: true,
            selectByClick: false,
        };
        this.treeViewSelectionChanged = this.treeViewSelectionChanged.bind(this);
        this.treeViewContentReady = this.treeViewContentReady.bind(this);
    }
    render() {
        return (
            <div>
                <div className="form">
                    <h4>Employees</h4>
                    <TreeView
                        id="treeview"
                        ref={this.treeViewRef}
                        // width={340}
                        // height={320}
                        items={this.state.employees}
                        selectNodesRecursive={this.state.selectNodesRecursive}
                        selectByClick={this.state.selectByClick}
                        showCheckBoxesMode={this.state.showCheckBoxesMode}
                        selectionMode={this.state.selectionMode}
                        onSelectionChanged={this.treeViewSelectionChanged}
                        onContentReady={this.treeViewContentReady}
                        itemRender={renderTreeViewItem}
                    />
                </div>

            </div>
        );
    }

    treeViewSelectionChanged(e: any) {
        this.syncSelection(e.component);
    }

    treeViewContentReady(e: any) {
        this.syncSelection(e.component);
    }

    syncSelection(treeView: any) {
        const selectedEmployees = treeView.getSelectedNodes()
            .map((node: any) => node.itemData);
        console.log(selectedEmployees)
        this.setState(() => {
            return { selectedEmployees: selectedEmployees };
        });
    }

    get treeView() {
        return this.treeViewRef.current.instance;
    }
}
