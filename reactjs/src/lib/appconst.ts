const AppConfig: {
  REACT_APP_APP_BASE_URL: string;
  REACT_APP_REMOTE_SERVICE_BASE_URL: string;
} = window["AppConfig"];
console.log(AppConfig);

const AppConsts = {
  userManagement: {
    defaultAdminUserName: "admin",
  },
  localization: {
    defaultLocalizationSourceName: "AspzeroReact",
  },
  authorization: {
    encrptedAuthTokenName: "enc_auth_token",
  },
  appBaseUrl: AppConfig
    ? AppConfig.REACT_APP_APP_BASE_URL
    : process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: AppConfig
    ? AppConfig.REACT_APP_REMOTE_SERVICE_BASE_URL
    : process.env.REACT_APP_REMOTE_SERVICE_BASE_URL,
  // appBaseUrl: "http://hitechsoft.vn:8084",
  // remoteServiceBaseUrl: "http://hitechsoft.vn:8083",
};
//console.log(AppConsts.appBaseUrl, AppConsts.remoteServiceBaseUrl);
export default AppConsts;
