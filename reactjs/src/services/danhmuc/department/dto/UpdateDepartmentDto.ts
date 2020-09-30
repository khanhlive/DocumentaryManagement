export class UpdateDepartmentDto implements IUpdateDepartmentDto {
  code!: string;
  name!: string;
  description?: string | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;

  constructor(data?: IUpdateDepartmentDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.code = _data["code"];
      this.name = _data["name"];
      this.description = _data["description"];
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): UpdateDepartmentDto {
    data = typeof data === "object" ? data : {};
    let result = new UpdateDepartmentDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["description"] = this.description;
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : <any>undefined;
    data["id"] = this.id;
    return data;
  }
}

export interface IUpdateDepartmentDto {
  code: string;
  name: string;
  description?: string | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;
}
