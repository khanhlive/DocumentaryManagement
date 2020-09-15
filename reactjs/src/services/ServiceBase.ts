import http from "./httpService";
import { AxiosResponse, AxiosInstance } from "axios";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import AppConsts from "../lib/appconst";
import { PagedResultDto } from "./dto/pagedResultDto";
//import AbpRespond from "./dto/AbpRespond";

declare var abp: any;

export interface IServiceBase<Dto, CreateDto, UpdateDto> {
  /**
   * @param input (optional)
   * @return Success
   */
  create(input: CreateDto | null | undefined): Promise<Dto>;
  /**
   * @param input (optional)
   * @return Success
   */
  update(input: UpdateDto | null | undefined): Promise<Dto>;
  //   /**
  //    * @param request (optional)
  //    * @return Success
  //    */
  //   getKendo(request: any | null | undefined): Promise<DataSourceResult>;
  // /**
  //  * @param loadOptions (optional)
  //  * @return Success
  //  */
  // getDevextreme(
  //   loadOptions: DataSourceLoadOptions | null | undefined
  // ): Promise<LoadResult>;
  /**
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getPaging(
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined
  ): Promise<any>;
  /**
   * @param id (optional)
   * @return Success
   */
  get(id: number | null | undefined): Promise<Dto>;
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id: number | null | undefined): Promise<void>;
}

interface IAbp_Actions {
  GetPaging?: string;
  Create?: string;
  Edit?: string;
  Delete?: string;
  Get?: string;
  GetJson?: string;
  Existed?: string;
  DevExtreme?: string;
}

export const Abp_Actions: IAbp_Actions = {
  GetPaging: "get-paging",
  Create: "create",
  Edit: "update",
  Delete: "delete",
  Get: "get",
  GetJson: "get-kendo",
  Existed: "existed",
  DevExtreme: "get-devextreme",
};

class ServiceBase<Dto, CreateDto, UpdateDto>
  implements IServiceBase<Dto, CreateDto, UpdateDto> {
  keyExpr?: string;
  baseUrl?: string = AppConsts.remoteServiceBaseUrl;
  protected httpBase: AxiosInstance = http;
  protected entityName?: string;
  constructor(keyExpr: string, entityName: string) {
    this.keyExpr = keyExpr;
    this.entityName = entityName;
  }
  public async getPaging(
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined
  ): Promise<PagedResultDto<Dto>> {
    let res = await this.httpBase.get(
      `/api/services/app/${this.entityName}/${Abp_Actions.GetPaging}`,
      {
        params: { skipCount: skipCount, maxResultCount: maxResultCount },
      }
    );
    return this.processResponseData(res);
  }
  public async create(input: CreateDto | null | undefined): Promise<Dto> {
    let res = await this.httpBase.post(
      `/api/services/app/${this.entityName}/${Abp_Actions.Create}`,
      input
    );
    return this.processResponseData(res);
  }

  public async update(input: UpdateDto | null | undefined): Promise<Dto> {
    let res = await this.httpBase.put(
      `/api/services/app/${this.entityName}/${Abp_Actions.Edit}`,
      input
    );
    return this.processResponseData(res);
  }
  public async get(id: number | null | undefined): Promise<Dto> {
    let res = await this.httpBase.get(
      `/api/services/app/${this.entityName}/${Abp_Actions.Get}`,
      {
        params: { id: id },
      }
    );
    return this.processResponseData(res);
  }
  public async delete(id: number | null | undefined): Promise<void> {
    let res = await this.httpBase.delete(
      `/api/services/app/${this.entityName}/${Abp_Actions.Delete}`,
      {
        params: { id: id },
      }
    );
    return this.processResponseData(res);
  }
  public GetAspNetDataSource(
    callback?: (method: string, ajaxOptions: any) => any
  ): any {
    return AspNetData.createStore({
      key: this.keyExpr,
      loadUrl: `${this.baseUrl}/api/services/app/${this.entityName}/${Abp_Actions.DevExtreme}`,
      loadMethod: "POST",
      onBeforeSend: (method, ajaxOptions) => {
        if (callback !== undefined) {
          callback(method, ajaxOptions);
        }
        ajaxOptions.headers = ajaxOptions.headers || {};
        if (!!abp.auth.getToken()) {
          ajaxOptions.headers["Authorization"] =
            "Bearer " + abp.auth.getToken();
        }
        //ajaxOptions.headers["Content-Type"] = "application/json; charset=utf-8";
        ajaxOptions.headers[".AspNetCore.Culture"] = abp.utils.getCookieValue(
          "Abp.Localization.CultureName"
        );
        ajaxOptions.headers[
          "Abp.TenantId"
        ] = abp.multiTenancy.getTenantIdCookie();
        ajaxOptions.xhrFields = { withCredentials: true };
        if (ajaxOptions.data) {
          //ajaxOptions.data["data"] = JSON.stringify({ id: 1, name: "khanhnd" });
        }
      },
      insertUrl: `${this.baseUrl}/api/services/app/${this.entityName}/store-create`,
      insertMethod: "POST",
      updateUrl: `${this.baseUrl}/api/services/app/${this.entityName}/store-edit`,
      updateMethod: "PUT",
      deleteUrl: `${this.baseUrl}/api/services/app/${this.entityName}/store-delete`,
      deleteMethod: "DELETE",
      onRemoving: (key: any) => {},
    });
  }

  protected processResponseData(res: AxiosResponse<any>) {
    return res.data.result;
  }
}
export default ServiceBase;
