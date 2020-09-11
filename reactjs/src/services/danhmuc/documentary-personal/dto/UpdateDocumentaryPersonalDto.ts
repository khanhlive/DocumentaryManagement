export default class UpdateDocumentaryPersonalDto
  implements IUpdateDocumentaryPersonalDto {
  code?: string | undefined;
  name?: string | undefined;
  documentTypeId?: number | undefined;
  agencyIssuedId?: number | undefined;
  description?: string | undefined;
  summaryContent?: string | undefined;
  content?: string | undefined;
  abridgment?: string | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;

  constructor(data?: IUpdateDocumentaryPersonalDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
    }
  }

  init(_data?: any) {
    if (_data) {
      this.code = _data["code"];
      this.name = _data["name"];
      this.documentTypeId = _data["documentTypeId"];
      this.agencyIssuedId = _data["agencyIssuedId"];
      this.description = _data["description"];
      this.summaryContent = _data["summaryContent"];
      this.content = _data["content"];
      this.abridgment = _data["abridgment"];
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): UpdateDocumentaryPersonalDto {
    data = typeof data === "object" ? data : {};
    let result = new UpdateDocumentaryPersonalDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["documentTypeId"] = this.documentTypeId;
    data["agencyIssuedId"] = this.agencyIssuedId;
    data["description"] = this.description;
    data["summaryContent"] = this.summaryContent;
    data["content"] = this.content;
    data["abridgment"] = this.abridgment;
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : <any>undefined;
    data["id"] = this.id;
    return data;
  }
}

export interface IUpdateDocumentaryPersonalDto {
  code?: string | undefined;
  name?: string | undefined;
  documentTypeId?: number | undefined;
  agencyIssuedId?: number | undefined;
  description?: string | undefined;
  summaryContent?: string | undefined;
  content?: string | undefined;
  abridgment?: string | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  id?: number | undefined;
}
