export class UpdateProvinceDto implements IUpdateProvinceDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  level?: string | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;

  constructor(data?: IUpdateProvinceDto) {
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
      this.level = _data["level"];
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): UpdateProvinceDto {
    data = typeof data === "object" ? data : {};
    let result = new UpdateProvinceDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["description"] = this.description;
    data["level"] = this.level;
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : <any>undefined;
    data["id"] = this.id;
    return data;
  }
}

export interface IUpdateProvinceDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  level?: string | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;
}
