import { ChangeLanguagaInput } from "./dto/changeLanguageInput";
import {
  ChangePasswordInput,
  CreateOrUpdateUserInput,
} from "./dto/createOrUpdateUserInput";
import { EntityDto } from "../../services/dto/entityDto";
import { GetAllUserOutput } from "./dto/getAllUserOutput";
import { PagedResultDto } from "../../services/dto/pagedResultDto";
import { PagedUserResultRequestDto } from "./dto/PagedUserResultRequestDto";
import { UpdateUserInput } from "./dto/updateUserInput";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import http from "../httpService";
import AppConsts from "../../lib/appconst";
import { Abp_Actions } from "../ServiceBase";

class UserService {
  public async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await http.post(
      "api/services/app/User/Create",
      Object.assign({}, createUserInput)
    );
    return result.data.result;
  }

  public async changePassword(changePasswordInput: ChangePasswordInput) {
    let result = await http.post(
      "api/services/app/User/changepassword",
      Object.assign({}, changePasswordInput)
    );
    return result.data.result;
  }

  public async update(updateUserInput: UpdateUserInput) {
    let result = await http.put(
      "api/services/app/User/Update",
      updateUserInput
    );
    return result.data;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete("api/services/app/User/Delete", {
      params: entityDto,
    });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get("api/services/app/User/GetRoles");
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post(
      "api/services/app/User/ChangeLanguage",
      changeLanguageInput
    );
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
    let result = await http.get("api/services/app/User/Get", {
      params: entityDto,
    });
    return result.data.result;
  }

  public async getCurrent(): Promise<CreateOrUpdateUserInput> {
    let result = await http.get("api/services/app/User/get-current");
    return result.data.result;
  }

  public async getAll(
    pagedFilterAndSortedRequest: PagedUserResultRequestDto
  ): Promise<PagedResultDto<GetAllUserOutput>> {
    let result = await http.get("api/services/app/User/GetAll", {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }

  public GetAspNetDataSource(
    callback?: (method: string, ajaxOptions: any) => any
  ): any {
    return AspNetData.createStore({
      key: "id",
      loadUrl: `${AppConsts.remoteServiceBaseUrl}/api/services/app/user/${Abp_Actions.DevExtreme}`,
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

  public async getUserForApproved(): Promise<any> {
    let result = await http.get(
      `/api/services/app/documentary/get-user-approvedd`
    );
    return result.data.result;
  }
}

export default new UserService();
