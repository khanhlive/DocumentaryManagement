import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { BigBreadcrumbs, JarvisWidget, Stats, WidgetGrid } from '../../../../common';
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator';
import notify from '../../../../common/utils/functions/notify';
import ProvinceService from '../../../../services/danhmuc/province/ProvinceService';
import userService from '../../../../services/user/userService';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import SessionStore from '../../../../stores/sessionStore';
import Stores from '../../../../stores/storeIdentifier'
import ChangePassword from './ChangePassword';

export interface IProfileProps {
    breadcrumbStore?: BreadcrumbStoreApp,
    sessionStore?: SessionStore
}

@inject(Stores.BreadcrumbStore, Stores.SessionStore)
@observer
export default class ProfileComponent extends Component<IProfileProps, any> {
    form?: HTMLFormElement;
    validator?: BootstrapValidator;
    changePassword?: ChangePassword;
    constructor(props: any) {
        super(props);
        this.state = {
            model: {},
            provinces: []
        }
        this.props.breadcrumbStore?.setItems(["Hệ thống", "Thông tin tài khoản"]);
        this.handleSave = this.handleSave.bind(this);
        this.getData = this.getData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openModalChangePassword = this.openModalChangePassword.bind(this);
    }

    componentDidMount() {
        this.getData();
        ProvinceService.getPaging(0, 9999999).then(res => {
            this.setState({
                provinces: res.items
            })
        })
    }

    handleSave() {
        userService.update(this.state.model).then(() => {
            notify('', `Cập nhật cấu hình thành công`, 'success');
            this.getData();
        })
    }
    getData() {
        userService.get({ id: this.props.sessionStore?.currentLogin.user.id || 0 }).then(res => {
            this.setState({ model: res });
        })
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
    onSubmit(e?: any) {
        e?.preventDefault();
        let isValid = this.validator?.isValid();
        if (isValid) {
            let model = this.state.model;
            model.name = model.fullName2;
            model.surname = model.fullName2;
            userService.update(model).then(res => {
                notify('', `Cập nhật tài khoản thành công`, 'success');
                this.validator?.resetForm()
                this.getData();
            })
        } else {
            notify('Thông báo', 'Dữ liệu nhập chưa chính xác', 'error', 'fa fa-remove');
        }
    }
    openModalChangePassword() {
        this.changePassword?.open();
    }
    render() {
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Hệ thống", "Thông tin tài khoản"]}
                                icon="fa fa-fw fa-cog"
                            />
                            {
                                this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                                    <Stats />
                                ) : null
                            }
                        </div>
                    ) : null
                }
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget
                                id="wid-id-thong-tin-tai-khoan"
                                className="well"
                                colorbutton={false}
                                editbutton={false}
                                data-widget-togglebutton="false"
                                data-widget-deletebutton="false"
                                data-widget-fullscreenbutton="false"
                                custombutton={false}
                                data-widget-sortable="false"
                            >
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-comments" />
                                    </span>
                                    <h2>Default Tabs with border </h2>
                                </header>

                                {/* widget div*/}
                                <div>
                                    {/* widget edit box */}
                                    <div className="jarviswidget-editbox">
                                        {/* This area used as dropdown edit box */}
                                    </div>
                                    {/* end widget edit box */}

                                    {/* widget content */}
                                    <div className="widget-body">
                                        <BootstrapValidator ref={ref => this.validator = ref || undefined}>
                                            <form
                                                ref={ref => this.form = ref || undefined}
                                                id="attributeForm"
                                                //onSubmit={this.onSubmit}
                                                className="form-horizontal"
                                                data-bv-message="Thông tin chưa hợp lệ"
                                                data-bv-excluded="false"
                                                data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                                                data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                                                data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
                                            >
                                                <div className="form-group">
                                                    <label className="control-label col-md-2">Họ tên<span className="text-required">(*)</span></label>
                                                    <div className="col-md-10">
                                                        <input
                                                            type="text"
                                                            onChange={this.handleInputChange.bind(this)}
                                                            value={this.state.model.fullName2}
                                                            name="fullName2"
                                                            className="form-control"
                                                            data-bv-notempty="true"
                                                            data-bv-notempty-message="Chưa nhập họ tên"
                                                        ></input>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2">Email<span className="text-required">(*)</span></label>
                                                    <div className="col-md-10">
                                                        <input
                                                            onChange={this.handleInputChange.bind(this)}
                                                            name="emailAddress"
                                                            value={this.state.model.emailAddress}
                                                            className="form-control"
                                                            type="email"
                                                            data-bv-emailaddress="true"
                                                            data-bv-emailaddress-message="Địa chỉ email không hợp lệ"
                                                        >

                                                        </input>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2">Điện thoại</label>
                                                    <div className="col-md-10">
                                                        <input
                                                            onChange={this.handleInputChange.bind(this)}
                                                            name="phoneNumber"
                                                            value={this.state.model.phoneNumber}
                                                            className="form-control"
                                                            type="text"
                                                            data-bv-digits="true"
                                                            data-bv-digits-message="Số điện thoại không đúng"
                                                            data-bv-stringlength="true"
                                                            data-bv-stringlength-min="10"
                                                            data-bv-stringlength-max="11"
                                                            data-bv-stringlength-message="Số điện thoại phải có 10 hoặc 11 số"
                                                        >

                                                        </input>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2">Đơn vị</label>
                                                    <div className="col-md-10">
                                                        <input
                                                            onChange={this.handleInputChange.bind(this)}
                                                            name="organization"
                                                            value={this.state.model.organization}
                                                            className="form-control"
                                                            type="text"
                                                            data-bv-stringlength="true"
                                                            data-bv-stringlength-max="250"
                                                            data-bv-stringlength-message="Nhập địa chỉ không quá 250 ký tự"
                                                        >

                                                        </input>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2">Tỉnh thành</label>
                                                    <div className="col-md-10">
                                                        <select
                                                            className="form-control"
                                                            onChange={this.handleInputChange.bind(this)}
                                                            name="provinceId"
                                                            value={this.state.model.provinceId}
                                                        >
                                                            {
                                                                this.state.provinces.map((item: any) => {
                                                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2">Địa chỉ</label>
                                                    <div className="col-md-10">
                                                        <input
                                                            onChange={this.handleInputChange.bind(this)}
                                                            name="address"
                                                            value={this.state.model.address}
                                                            className="form-control"
                                                            type="text"
                                                            data-bv-stringlength="true"
                                                            data-bv-stringlength-max="250"
                                                            data-bv-stringlength-message="Nhập địa chỉ không quá 250 ký tự"
                                                        >

                                                        </input>
                                                    </div>
                                                </div>
                                            </form>
                                        </BootstrapValidator>
                                        <div className="widget-footer">
                                            <button className="btn btn-sm btn-info" style={{ marginRight: '15px' }} onClick={this.openModalChangePassword} type="button"><i className="fa fa-key"></i> Thay đổi mật khẩu</button>
                                            <button className="btn btn-sm btn-primary" onClick={this.onSubmit} type="button"><i className="fa fa-save"></i> Cập nhật</button>
                                        </div>
                                    </div>
                                    {/* end widget content */}


                                </div>
                                {/* end widget div */}
                            </JarvisWidget>

                        </article>
                    </div>
                </WidgetGrid>

                <ChangePassword onSuccess={this.getData} ref={ref => this.changePassword = ref || undefined}></ChangePassword>
            </div>
        )
    }
}
