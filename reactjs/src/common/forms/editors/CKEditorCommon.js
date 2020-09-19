import React, { Component } from 'react';
//import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from 'ckeditor4-react';

export default class CKEditorCommon extends Component {
    constructor(props) {
        super(props);
        this.print = this.print.bind(this);
    }
    editorName;
    handleValueChange(event, editor) {
        const data = editor.getData();
        if (this.props.onChange) {
            this.props.onChange(this.props.fieldName, data);
        }
    }
    componentDidMount() {
    }

    print() {
        const editor = window.CKEDITOR.instances[this.editorName];
        if (editor)
            editor.execCommand('print');
    }

    render() {
        return (
            // <CKEditor
            //     editor={ClassicEditor}
            //     onInit={editor => {
            //         console.log(editor)
            //     }}
            //     // config={
            //     //     {
            //     //         extraPlugins: 'colorbutton,font,justify,print,tableresize,liststyle,pagebreak',
            //     //     }
            //     // }
            //     onChange={this.handleValueChange.bind(this)}
            // >

            // </CKEditor>

            <CKEditor
                ref={ref => { this.editor = ref; this.editorName = (ref && ref.editor) ? ref.editor.name : ''; }}
                data={this.props.data}
                type="classic"
                readOnly={this.props.readOnly}
                onChange={evt => this.handleValueChange(evt, evt.editor)}
                config={
                    {
                        extraPlugins: 'colorbutton,font,justify,print,tableresize,liststyle,pagebreak',
                    }
                }
            />
        )
    }
}
