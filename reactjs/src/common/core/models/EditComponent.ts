import { Component } from "react";
//import PropTypes from "prop-types";

import BootstrapValidator from "../../forms/validation/BootstrapValidator";
import IEditComponentProps from "./EditingComponentProps";
import IEditComponentStates from "./EditComponentStates";

export interface IEditComponent {
  form?: HTMLFormElement;
  validator?: BootstrapValidator;
  onSubmit(e: any): any;
  handleInputChange(e: any): any;
}
export default abstract class EditComponentBase<
    P extends IEditComponentProps,
    S extends IEditComponentStates
  >
  extends Component<P, S>
  implements IEditComponent {
  //   constructor(props: P) {
  //     super(props);
  //   }
  public abstract onSubmit(e: any): any;
  //public abstract handleInputChange(e: any): any;

  public form?: HTMLFormElement;
  public validator?: BootstrapValidator;
  public handleSave() {
    this.form?.dispatchEvent(new Event("submit"));
  }
  public create(model: any) {
    this.setState({
      isShow: true,
      model: model || {},
      id: 0,
      isEdit: false,
    });
  }
  public edit(id: number, model: any) {
    this.setState({
      isShow: true,
      model: model,
      id: id,
      isEdit: true,
    });
  }

  public handleClose() {
    this.setState({ isShow: false });
    if (this.props.onCancle !== undefined) {
      this.props.onCancle();
    }
  }
  public handleInputChange(e: any) {
    let model = this.state.model || {};
    let name = e.target.name;
    let type = e.target.type;
    let value = type === "checkbox" ? e.target.checked : e.target.value;

    model[name] = value;
    this.setState({
      model: model,
    });
  }
}
