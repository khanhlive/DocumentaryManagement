export class CreateDepartmentDto implements ICreateDepartmentDto {
  code!: string;
  name!: string;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;

  constructor(data?: ICreateDepartmentDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.name = "";
      this.code = "";
      this.description = "";
    }
  }

  init(_data?: any) {
    if (_data) {
      this.code = _data["code"];
      this.name = _data["name"];
      this.description = _data["description"];
      this.creationId = _data["creationId"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateDepartmentDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateDepartmentDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["description"] = this.description;
    data["creationId"] = this.creationId;
    data["creationDate"] = this.creationDate
      ? this.creationDate.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface ICreateDepartmentDto {
  code: string;
  name: string;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
}
