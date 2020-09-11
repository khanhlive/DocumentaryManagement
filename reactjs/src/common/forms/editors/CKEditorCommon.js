import React, { Component } from 'react';
//import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from 'ckeditor4-react';

export default class CKEditorCommon extends Component {

    handleValueChange(event, editor) {
        const data = editor.getData();
        if (this.props.onChange) {
            this.props.onChange(this.props.fieldName, data);
        }
    }
    render() {
        return (
            // <CKEditor
            //     editor={ClassicEditor}
            //     onInit={editor => {
            //         //console.log(editor)
            //     }}
            //     onChange={this.handleValueChange.bind(this)}
            // >

            // </CKEditor>

            <CKEditor
                data={this.props.data}
                type="classic"
                onChange={evt => this.handleValueChange(evt, evt.editor)}
            />
        )
    }
}
