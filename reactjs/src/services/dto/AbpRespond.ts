export default interface AbpRespond {
  result?: any;
  targetUrl?: string;
  success?: boolean;
  error?: any;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}
