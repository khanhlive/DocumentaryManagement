import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { BigBreadcrumbs, JarvisWidget, Stats, WidgetGrid } from '../../../../common';
import BootstrapValidator from '../../../../common/forms/validation/BootstrapValidator';
import notify from '../../../../common/utils/functions/notify';
import ConfigService from '../../../../services/danhmuc/config/ConfigService';
import BreadcrumbStoreApp from '../../../../stores/BreadcrumbStore';
import Stores from '../../../../stores/storeIdentifier';
import { ConfigDto } from '../Dto/ConfigDto';
import AgencyIssuedService from '../../../../services/danhmuc/agency-issued/AgencyIssuedService';
import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { AgencyIssuedDto } from '../../../../services/danhmuc/agency-issued/dto/AgencyIssuedDto';


export interface IProvinceProps {
    breadcrumbStore?: BreadcrumbStoreApp
}
const validationRules = {
    feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
    },
    fields: {
        singer: {
            group: ".col-md-10",
            validators: {
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 50 ký tự"
                }
            }
        },
        approvedBy: {
            group: ".col-md-10",
            validators: {
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        sender: {
            group: ".col-md-10",
            validators: {
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
        agencyIssuedId: {
            group: ".col-md-10",
        },
        receivedBy: {
            group: ".col-md-10",
            validators: {
                stringLength: {
                    max: 250,
                    message: "Nhập tối đa 250 ký tự"
                }
            }
        },
    }
}
@inject(Stores.BreadcrumbStore)
@observer
export default class ConfigSystem extends Component<IProvinceProps, any> {
    public form?: HTMLFormElement;
    public divForm?: HTMLDivElement;
    public validator?: BootstrapValidator;
    constructor(props: any) {
        super(props);
        let model = new ConfigDto();
        //model.agencyIssuedId = 2;

        this.state = {
            model: model,
            options: []
        }
        this.props.breadcrumbStore?.setItems(["Cấu hình", "Thông tin người ký duyệt"]);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
        AgencyIssuedService.getPaging(0, 99999999).then((res: PagedResultDto<AgencyIssuedDto>) => {
            let data = res.items.map(item => { return { value: item.id, label: item.name } });
            this.setState({
                options: data
            })
        })
    }

    getData() {
        ConfigService.getConfig().then(res => {
            this.setState({ model: res });
            ConfigService.setCache(res);
        })
    }

    handleSave() {
        ConfigService.updateConfig(this.state.model).then(() => {
            notify('', `Cập nhật cấu hình thành công`, 'success');
            this.getData();
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
    handleSelectChange(e: any) {
        let model = this.state.model || {};
        model['agencyIssuedId'] = e.target.value;
        this.setState({
            model: model,
        });
    }
    render() {
        return (
            <div id="content">
                {
                    this.props.breadcrumbStore?.useBigBreadcrum == true ? (
                        <div className="row">
                            <BigBreadcrumbs
                                items={["Cấu hình", "Thông tin người ký duyệt"]}
                                icon="fa fa-fw fa-cog"
                            />
                            {
                                this.props.breadcrumbStore?.useStats == true ? (
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
                                id="wid-id-cau-hinh-nguoi-ky-duyet"
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
                                        <div className="" style={{ marginBottom: '10px' }}>
                                            <p>
                                                Cấu hình thông tin người ký duyệt</p>
                                            <hr className="simple" />
                                            <ul id="myTab1" className="nav nav-tabs bordered">
                                                <li className="active">
                                                    <a href="#s1" data-toggle="tab">
                                                        Văn bản đi
                                                </a>
                                                </li>
                                                <li>
                                                    <a href="#s2" data-toggle="tab">Văn bản đến
                                                </a>
                                                </li>

                                            </ul>

                                            <div id="myTabContent1" className="tab-content padding-10">
                                                <BootstrapValidator ref={ref => this.validator = ref || undefined} options={validationRules}>
                                                    <div className="tab-pane fade in active" id="s1">
                                                        <div className="form-horizontal">
                                                            <div className="form-group">
                                                                <label className="control-label col-md-2">Người ký</label>
                                                                <div className="col-md-10">
                                                                    <input type="text" onChange={this.handleInputChange.bind(this)} value={this.state.model?.singer} name="singer" className="form-control"></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label col-md-2">Người duyệt</label>
                                                                <div className="col-md-10">
                                                                    <input type="text" onChange={this.handleInputChange.bind(this)} name="approvedBy" value={this.state.model?.approvedBy} className="form-control"></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label col-md-2">Người gửi</label>
                                                                <div className="col-md-10">
                                                                    <input type="text" onChange={this.handleInputChange.bind(this)} name="sender" value={this.state.model?.sender} className="form-control"></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label col-md-2">Nơi ban hành</label>
                                                                <div className="col-md-10">
                                                                    <select className="form-control" onChange={this.handleSelectChange} value={this.state.model.agencyIssuedId} name="agencyIssuedId">
                                                                        {this.state.options.map((item: any) => {
                                                                            return <option key={item.value} value={item.value}>{item.label}</option>
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="s2">
                                                        <div className="form-horizontal">
                                                            <div className="form-group">
                                                                <label className="control-label col-md-2">Người nhận</label>
                                                                <div className="col-md-10">
                                                                    <input type="text" onChange={this.handleInputChange.bind(this)} value={this.state.model?.receivedBy} name="receivedBy" className="form-control"></input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </BootstrapValidator>
                                            </div>
                                        </div>
                                        <div className="widget-footer">
                                            <button className="btn btn-sm btn-primary" onClick={this.handleSave} type="button"><i className="fa fa-save"></i> Cập nhật</button>
                                        </div>
                                    </div>
                                    {/* end widget content */}


                                </div>
                                {/* end widget div */}
                            </JarvisWidget>

                        </article>
                    </div>
                </WidgetGrid>


            </div>

        )
    }
}
