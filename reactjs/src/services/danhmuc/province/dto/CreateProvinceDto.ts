export class CreateProvinceDto implements ICreateProvinceDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  level?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  //users?: User[] | undefined;

  constructor(data?: ICreateProvinceDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.code = "";
      this.description = "";
      this.level = "";
      this.name = "";
    }
  }

  init(_data?: any) {
    if (_data) {
      this.code = _data["code"];
      this.name = _data["name"];
      this.description = _data["description"];
      this.level = _data["level"];
      this.creationId = _data["creationId"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateProvinceDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateProvinceDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["description"] = this.description;
    data["level"] = this.level;
    data["creationId"] = this.creationId;
    data["creationDate"] = this.creationDate
      ? this.creationDate.toISOString()
      : <any>undefined;

    return data;
  }
}

export interface ICreateProvinceDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  level?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  //users?: User[] | undefined;
}
