export default class CreateAgencyIssuedDto implements ICreateAgencyIssuedDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;

  constructor(data?: ICreateAgencyIssuedDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.code = "";
      this.name = "";
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

  static fromJS(data: any): CreateAgencyIssuedDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateAgencyIssuedDto();
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

export interface ICreateAgencyIssuedDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
}
