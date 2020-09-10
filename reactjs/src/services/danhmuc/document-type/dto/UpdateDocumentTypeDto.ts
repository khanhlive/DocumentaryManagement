export interface IUpdateDocumentTypeDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;
}
export class UpdateDocumentTypeDto implements IUpdateDocumentTypeDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;

  constructor(data?: IUpdateDocumentTypeDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.code = "";
      this.name = "";
      this.description = "";
      this.creationId = 0;
      this.creationDate = undefined;
      this.updatedId = 0;
      this.updatedDate = undefined;
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
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): UpdateDocumentTypeDto {
    data = typeof data === "object" ? data : {};
    let result = new UpdateDocumentTypeDto();
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
    data["id"] = this.id;
    return data;
  }
}
