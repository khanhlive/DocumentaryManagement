export default class DocumentaryPersonalDto implements IDocumentaryPersonalDto {
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
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  //agencyIssued?: AppAgencyIssued | undefined;
  //documentType?: AppDocumentType | undefined;
  //appAttachments?: AppAttachments[] | undefined;
  id?: number | undefined;

  constructor(data?: IDocumentaryPersonalDto) {
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
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      //   this.agencyIssued = _data["agencyIssued"]
      //     ? AppAgencyIssued.fromJS(_data["agencyIssued"])
      //     : <any>undefined;
      //   this.documentType = _data["documentType"]
      //     ? AppDocumentType.fromJS(_data["documentType"])
      //     : <any>undefined;
      //   if (Array.isArray(_data["appAttachments"])) {
      //     this.appAttachments = [] as any;
      //     for (let item of _data["appAttachments"])
      //       this.appAttachments!.push(AppAttachments.fromJS(item));
      //   }
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): DocumentaryPersonalDto {
    data = typeof data === "object" ? data : {};
    let result = new DocumentaryPersonalDto();
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
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : <any>undefined;
    // data["agencyIssued"] = this.agencyIssued
    //   ? this.agencyIssued.toJSON()
    //   : <any>undefined;
    // data["documentType"] = this.documentType
    //   ? this.documentType.toJSON()
    //   : <any>undefined;
    // if (Array.isArray(this.appAttachments)) {
    //   data["appAttachments"] = [];
    //   for (let item of this.appAttachments)
    //     data["appAttachments"].push(item.toJSON());
    // }
    data["id"] = this.id;
    return data;
  }
}

export interface IDocumentaryPersonalDto {
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
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  //agencyIssued?: AppAgencyIssued | undefined;
  //documentType?: AppDocumentType | undefined;
  //appAttachments?: AppAttachments[] | undefined;
  id?: number | undefined;
}
