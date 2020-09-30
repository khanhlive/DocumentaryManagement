export class DepartmentDto implements IDepartmentDto {
  code!: string;
  name!: string;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  id?: number | undefined;

  constructor(data?: IDepartmentDto) {
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
      this.creationId = _data["creationId"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      this.isDeleted = _data["isDeleted"];
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): DepartmentDto {
    data = typeof data === "object" ? data : {};
    let result = new DepartmentDto();
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
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : <any>undefined;
    data["isDeleted"] = this.isDeleted;
    data["id"] = this.id;
    return data;
  }
}

export interface IDepartmentDto {
  code: string;
  name: string;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  id?: number | undefined;
}
