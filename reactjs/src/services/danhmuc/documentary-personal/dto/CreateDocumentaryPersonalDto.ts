export default class CreateDocumentaryPersonalDto
  implements ICreateDocumentaryPersonalDto {
  code?: string | undefined;
  name?: string | undefined;
  documentTypeId?: number | undefined;
  agencyIssuedId?: number | undefined;
  description?: string | undefined;
  summaryContent?: string | undefined;
  content?: string | undefined;
  abridgment?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;

  constructor(data?: ICreateDocumentaryPersonalDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.code = "";
      this.name = "";
      this.documentTypeId = undefined;
      this.description = "";
      this.summaryContent = "";
      this.content = "";
      this.abridgment = "";
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
      this.creationId = _data["creationId"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateDocumentaryPersonalDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateDocumentaryPersonalDto();
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
    data["creationId"] = this.creationId;
    data["creationDate"] = this.creationDate
      ? this.creationDate.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface ICreateDocumentaryPersonalDto {
  code?: string | undefined;
  name?: string | undefined;
  documentTypeId?: number | undefined;
  agencyIssuedId?: number | undefined;
  description?: string | undefined;
  summaryContent?: string | undefined;
  content?: string | undefined;
  abridgment?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
}
