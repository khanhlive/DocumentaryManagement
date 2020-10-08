import ServiceBase from "../../ServiceBase";
import { DepartmentDto } from "./dto/DepartmentDto";
import { CreateDepartmentDto } from "./dto/CreateDepartmentDto";
import { UpdateDepartmentDto } from "./dto/UpdateDepartmentDto";

class DepartmentService extends ServiceBase<
  DepartmentDto,
  CreateDepartmentDto,
  UpdateDepartmentDto
> {
  constructor() {
    super("id", "department");
  }
  public async getDepartmentForApproved(): Promise<DepartmentDto> {
    let res = await this.httpBase.get(
      `/api/services/app/${this.entityName}/get-department-approved`
    );
    return this.processResponseData(res);
  }

  public async getDepartmentUserTreeViewData(documentId: number): Promise<any> {
    let res = await this.httpBase.get(
      `/api/services/app/${this.entityName}/get-department-user-treeview`,
      {
        params: {
          documentId: documentId,
        },
      }
    );
    return this.processResponseData(res);
  }

  public async getDepartmentUserTreeListData(documentId: number): Promise<any> {
    let res = await this.httpBase.get(
      `/api/services/app/${this.entityName}/get-department-user-treelist`,
      {
        params: {
          documentId: documentId,
        },
      }
    );
    return this.processResponseData(res);
  }
}

export default new DepartmentService();
