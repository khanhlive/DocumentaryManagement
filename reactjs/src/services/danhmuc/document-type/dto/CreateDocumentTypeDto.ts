export interface ICreateDocumentTypeDto {
  code?: string | undefined | null;
  name?: string | undefined | null;
  description?: string | undefined | null;
  creationId?: number | undefined | null;
  creationDate?: Date | undefined | null;
  updatedId?: number | undefined | null;
  updatedDate?: Date | undefined | null;
}
export class CreateDocumentTypeDto implements ICreateDocumentTypeDto {
  code?: string | undefined | null;
  name?: string | undefined | null;
  description?: string | undefined | null;
  creationId?: number | undefined | null;
  creationDate?: Date | undefined | null;
  updatedId?: number | undefined | null;
  updatedDate?: Date | undefined | null;

  constructor(data?: ICreateDocumentTypeDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (this as any)[property] = (data as any)[property];
      }
    } else {
      this.code = "";
      this.name = "";
      this.description = "";
      this.creationId = 0;
      this.creationDate = null;
      this.updatedId = 0;
      this.updatedDate = null;
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
        : (undefined as any);
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : (undefined as any);
    }
  }

  static fromJS(data: any): CreateDocumentTypeDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateDocumentTypeDto();
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
      : (undefined as any);
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : (undefined as any);
    return data;
  }
}
