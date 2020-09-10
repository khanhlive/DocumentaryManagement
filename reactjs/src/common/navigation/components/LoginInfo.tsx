import React from "react";
import ToggleShortcut from "./ToggleShortcut";

import { inject, observer } from "mobx-react";
import Stores from "../../../stores/storeIdentifier";
import { connect } from "react-redux";

@inject('storeapp', Stores.AccountStore, Stores.AuthenticationStore, Stores.SessionStore)
@observer
class LoginInfo extends React.Component<any, any> {
  UNSAFE_componentWillMount() { }

  render() {
    return (
      <div className="login-info">
        <span>
          <ToggleShortcut>
            <img src={this.props.picture} alt="me" className="online" />
            <span>{this.props.sessionStore!.currentLogin.user ? this.props.sessionStore!.currentLogin.user.name : null}</span>
            <i className="fa fa-angle-down" />
          </ToggleShortcut>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => state.user;

export default connect(mapStateToProps)(LoginInfo);
