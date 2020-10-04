import React from "react";
import UiValidate from "../../../common/forms/validation/UiValidate";
import { inject, observer } from "mobx-react";
import Stores from "../../../stores/storeIdentifier";
import { Redirect } from 'react-router-dom';

@inject('storeapp', Stores.AccountStore, Stores.AuthenticationStore, Stores.SessionStore)
@observer
class Login extends React.Component<any, any> {
  formLogin: any;
  formLogin1: any;
  constructor(props: any) {
    super(props);
    let model = this.props.authenticationStore.loginModel || {};
    model.rememberMe = model.rememberMe == null || model.rememberMe == undefined ? true : model.rememberMe;
    this.state = {
      loginModel: model,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onClick = (e: any) => {
    e.preventDefault();
  };
  onChange(e: any) {

    let _state = this.state;
    if (e.target.type == 'checkbox') {
      _state.loginModel[e.target.name] = e.target.checked;
    } else {
      _state.loginModel[e.target.name] = e.target.value;
    }
    this.setState(_state);
  }
  async onSubmit(e: any) {
    e.preventDefault();

    let loginModel = this.state.loginModel;
    if (loginModel.userNameOrEmailAddress && loginModel.password) {
      await this.props.authenticationStore.login(loginModel);
      sessionStorage.setItem("rememberMe", loginModel.rememberMe ? "1" : "0");
      const { state } = this.props.location;
      //window.location.assign('#' + state.from.pathname);
      //debugger
      window.location = state ? state.from.pathname : "/";
    }

  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.authenticationStore!.isAuthenticated) return <Redirect to={from} />;
    return (
      <div id="extr-page">
        <header id="header" className="animated fadeInDown">
          <div id="logo-group">
            <span id="logo">
              <img src="assets/img/logo.png" alt="SmartAdmin" />
            </span>
          </div>

          {/* <span id="extr-page-header-space">
            <span className="hidden-mobile hiddex-xs">
              Need an account?
                </span>
                &nbsp;
                <a href="/register" className="btn btn-danger">
              Create account
                </a>
          </span> */}
        </header>
        <div id="main" role="main" className="animated fadeInDown">
          <div id="content" className="container">
            <div className="row">
              {/* <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                <img src={'assets/img/bg1.png'} style={{ width: '100%', height: '100%' }}></img>
              </div> */}
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                <h1 className="txt-color-red login-header-big">
                  SmartAdmin
                    </h1>

                <div className="hero">
                  <div className="pull-left login-desc-box-l">
                    <h4 className="paragraph-header">
                      It's Okay to be Smart. Experience the simplicity of
                      SmartAdmin, everywhere you go!
                        </h4>

                    <div className="login-app-icons">
                      <a
                        href="/dashboard/analytics"
                        className="btn btn-danger btn-sm"
                      >
                        Frontend Template
                          </a>
                      <span> </span>
                      <a
                        href="/smartadmin/different-versions.html"
                        className="btn btn-danger btn-sm"
                      >
                        Find out more
                          </a>
                    </div>
                  </div>
                  <img
                    src="assets/img/demo/iphoneview.png"
                    className="pull-right display-image"
                    alt=""
                    style={{ width: "210px" }}
                  />
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 className="about-heading">
                      About SmartAdmin - Are you up to date?
                        </h5>

                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam
                      rem aperiam, eaque ipsa.
                        </p>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 className="about-heading">
                      Not just your average template!
                        </h5>

                    <p>
                      Et harum quidem rerum facilis est et expedita
                      distinctio. Nam libero tempore, cum soluta nobis est
                      eligendi voluptatem accusantium!
                        </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                <div className="well no-padding">
                  <UiValidate ref={(ref) => (this.formLogin = ref)}>
                    <form
                      ref={(ref) => (this.formLogin1 = ref)}
                      id="login-form"
                      onSubmit={this.onSubmit}
                      className="smart-form client-form"
                    >
                      <header>Đăng nhập</header>
                      <fieldset>
                        <section>
                          <label className="label">Tên đăng nhập</label>
                          <label className="input">
                            <i className="icon-append fa fa-user" />
                            <input
                              type="text"
                              name="userNameOrEmailAddress"
                              data-smart-validate-input=""
                              data-required="true"
                              //data-email=""
                              onChange={this.onChange}
                              data-message-required="Bạn chưa nhập tên đăng nhập"
                            //data-message-email="Please enter a VALID email address"
                            />
                            <b className="tooltip tooltip-top-right">
                              <i className="fa fa-user txt-color-teal" />
                                  Nhập tài khoản đăng nhập của bạn
                                </b>
                          </label>
                        </section>
                        <section>
                          <label className="label">Mật khẩu</label>
                          <label className="input">
                            <i className="icon-append fa fa-lock" />
                            <input
                              type="password"
                              name="password"
                              data-smart-validate-input=""
                              data-required="true"
                              onChange={this.onChange}
                              data-minlength="3"
                              data-maxnlength="50"
                              data-message="Mật khẩu từ 3-50 ký tự"
                              data-message-required="Chưa nhập mật khẩu"
                            />
                            <b className="tooltip tooltip-top-right">
                              <i className="fa fa-lock txt-color-teal" />
                                  Nhập mật khẩu
                                </b>
                          </label>

                          <div className="note">
                            <a href="/forgot">Quên mật khẩu?</a>
                          </div>
                        </section>
                        <section>
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              onChange={this.onChange}
                              name="rememberMe"
                              defaultChecked={true}
                            />
                            <i />
                                Ghi nhớ đăng nhập
                              </label>
                        </section>
                      </fieldset>
                      <footer>
                        <button type="submit" className="btn btn-primary">
                          Đăng nhập
                            </button>
                      </footer>
                    </form>
                  </UiValidate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
