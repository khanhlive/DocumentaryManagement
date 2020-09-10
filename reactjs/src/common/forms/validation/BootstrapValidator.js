import React from "react";
import { findDOMNode } from "react-dom";
import $ from "jquery";

import "smartadmin-plugins/bower_components/bootstrapvalidator/dist/js/bootstrapValidator.min.js";

export default class BootstrapValidator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isValid: undefined
    }
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(isValid) {
    this.setState({ isValid: isValid });
    if (this.props.onStateChange != undefined) {
      this.props.onStateChange(isValid);
    }
  }

  componentDidMount() {
    $(findDOMNode(this)).bootstrapValidator(this.props.options || {})
      .on('success.form.bv', (e, data) => {
        this.handleStateChange(true);
      }).on('error.form.bv', (e, data) => {
        this.handleStateChange(false);
      });
  }

  isValid() {
    let form = $(findDOMNode(this)).data('bootstrapValidator');
    form.validate();
    return form.isValid();
  }

  render() {
    return this.props.children;
  }
}
