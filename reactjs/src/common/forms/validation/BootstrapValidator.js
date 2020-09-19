import React from "react";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import PropTypes from 'prop-types';

import "smartadmin-plugins/bower_components/bootstrapvalidator/dist/js/bootstrapValidator.min.js";

export const BVContext = React.createContext();

class BootstrapValidator extends React.Component {
  instance;
  constructor(props) {
    super(props);
    this.state = {
      isValid: undefined,
      validates: []
    }
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleValidateField = this.handleValidateField.bind(this);
    this.getFieldValid = this.getFieldValid.bind(this)
  }

  handleStateChange(isValid) {
    this.setState({ isValid: isValid });
    if (this.props.onStateChange != undefined) {
      this.props.onStateChange(isValid);
    }
  }
  handleValidateField(data) {
    let fields = this.state.validates;
    let field = fields?.find(p => p.field === data.field);
    if (field) {
      fields.forEach(item => {
        if (item.field === data.field) {
          item.valid = data.valid;
        }
      })
    } else {
      fields.push(data);
    }
    this.setState({ validates: fields });
  }
  handleFieldChange(e, data) {
    if (data.status === "VALID" || data.status === "INVALID")
      this.handleValidateField({ field: data.field, valid: data.status === "VALID" });
  }

  componentDidMount() {
    //= $(findDOMNode(this)).data('bootstrapValidator')
    this.instance = $(findDOMNode(this)).bootstrapValidator(this.props.options || {})
      .on('success.form.bv', (e, data) => {
        //console.log(e, data)
        this.handleStateChange(true);
      }).on('error.form.bv', (e, data) => {
        //console.log(e, data)
        this.handleStateChange(false);
      }).on('success.field.bv', (e, data) => {
        //console.log(e, data)
      }).on('error.field.bv', (e, data) => {
        //console.log(e, data)
      }).on('status.field.bv', (e, data) => {
        //console.log(e, data);
        this.handleFieldChange(e, data);
      }).on('success.validator.bv', (e, data) => {
        //console.log(e, data)
      }).on('error.validator.bv', (e, data) => {
        //console.log(e, data)
      }).data('bootstrapValidator');
  }

  isValid() {
    let form = $(findDOMNode(this)).data('bootstrapValidator');
    form.validate();
    return form.isValid();
  }
  resetForm() {
    let form = $(findDOMNode(this)).data('bootstrapValidator');
    form.resetForm();
  }
  getFieldValid(fieldName) {
    let form = $(findDOMNode(this)).data('bootstrapValidator');
    let isValid = form == undefined || this.state.validates.find(p => p.field === fieldName) == null ? null : form.isValidField(fieldName);
    return isValid;
  }

  render() {

    return <BVContext.Provider value={{
      state: this.state,
      isValid: (fieldName) => {
        return this.getFieldValid(fieldName);
      }
    }}>
      {this.props.children}
    </BVContext.Provider>
  }
}
BootstrapValidator.propTypes = {
  options: PropTypes.object,
  onStateChange: PropTypes.func,
  onFieldChange: PropTypes.func
}
BootstrapValidator.defaultProps = {
  options: {},
  onStateChange: () => { },
  onFieldChange: () => { }
}
export default BootstrapValidator;
