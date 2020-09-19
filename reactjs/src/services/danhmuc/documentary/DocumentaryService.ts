import ServiceBase, { Abp_Actions } from "../../ServiceBase";
import CreateDocumentaryDto from "./dto/CreateDocumentaryDto";
import DocumentaryDto from "./dto/DocumentaryDto";
import UpdateDocumentaryDto from "./dto/UpdateDocumentaryDto";
import * as AspNetData from "devextreme-aspnet-data-nojquery";

class DocumentaryService extends ServiceBase<
  DocumentaryDto,
  CreateDocumentaryDto,
  UpdateDocumentaryDto
> {
  constructor() {
    super("id", "Documentary");
  }
  public GetAspNetDataSourceBook(
    callback?: (method: string, ajaxOptions: any) => any
  ): any {
    return AspNetData.createStore({
      key: this.keyExpr,
      loadUrl: `${this.baseUrl}/api/services/app/${this.entityName}/get-book-devextreme`,
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
        ajaxOptions.headers[".AspNetCore.Culture"] = abp.utils.getCookieValue(
          "Abp.Localization.CultureName"
        );
        ajaxOptions.headers[
          "Abp.TenantId"
        ] = abp.multiTenancy.getTenantIdCookie();
        //ajaxOptions.xhrFields = { withCredentials: true };
      },
    });
  }
  public GetAspNetDataSourceSearch(
    callback?: (method: string, ajaxOptions: any) => any
  ): any {
    return AspNetData.createStore({
      key: this.keyExpr,
      loadUrl: `${this.baseUrl}/api/services/app/${this.entityName}/get-search-devextreme`,
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
        ajaxOptions.headers[".AspNetCore.Culture"] = abp.utils.getCookieValue(
          "Abp.Localization.CultureName"
        );
        ajaxOptions.headers[
          "Abp.TenantId"
        ] = abp.multiTenancy.getTenantIdCookie();
        //ajaxOptions.xhrFields = { withCredentials: true };
      },
    });
  }
}

export default new DocumentaryService();
