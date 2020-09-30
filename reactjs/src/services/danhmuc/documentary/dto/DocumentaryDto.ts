import AppAttachments from "../../attachment/dto/AppAttachments";

export default class DocumentaryDto implements IDocumentaryDto {
  code?: string | undefined;
  name?: string | undefined;
  releaseDate?: Date | undefined;
  receivedDate?: Date | undefined;
  textNumber?: number | undefined;
  signer?: string | undefined;
  approvedBy?: string | undefined;
  receivedBy?: string | undefined;
  documentTypeId?: number | undefined;
  agencyIssuedId?: number | undefined;
  totalPage?: number | undefined;
  isProcessed?: boolean | undefined;
  categoryName?: string | undefined;
  performancePerson?: string | undefined;
  description?: string | undefined;
  summaryContent?: string | undefined;
  content?: string | undefined;
  type?: number | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  appAttachments?: AppAttachments[] | undefined;
  id?: number | undefined;
  isApproved?: boolean | undefined;
  approvedDepartmentId?: number | undefined;
  approvedUserId?: number | undefined;
  approvedType?: number | undefined;
  approvedContent?: string | undefined;

  constructor(data?: IDocumentaryDto) {
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
      this.releaseDate = _data["releaseDate"]
        ? new Date(_data["releaseDate"].toString())
        : <any>undefined;
      this.receivedDate = _data["receivedDate"]
        ? new Date(_data["receivedDate"].toString())
        : <any>undefined;
      this.textNumber = _data["textNumber"];
      this.signer = _data["signer"];
      this.approvedBy = _data["approvedBy"];
      this.receivedBy = _data["receivedBy"];
      this.documentTypeId = _data["documentTypeId"];
      this.agencyIssuedId = _data["agencyIssuedId"];
      this.totalPage = _data["totalPage"];
      this.isProcessed = _data["isProcessed"];
      this.categoryName = _data["categoryName"];
      this.performancePerson = _data["performancePerson"];
      this.description = _data["description"];
      this.summaryContent = _data["summaryContent"];
      this.content = _data["content"];
      this.type = _data["type"];
      this.creationId = _data["creationId"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      this.isDeleted = _data["isDeleted"];
      if (Array.isArray(_data["appAttachments"])) {
        this.appAttachments = [] as any;
        for (let item of _data["appAttachments"])
          this.appAttachments!.push(AppAttachments.fromJS(item));
      }
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): DocumentaryDto {
    data = typeof data === "object" ? data : {};
    let result = new DocumentaryDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["releaseDate"] = this.releaseDate
      ? this.releaseDate.toISOString()
      : <any>undefined;
    data["receivedDate"] = this.receivedDate
      ? this.receivedDate.toISOString()
      : <any>undefined;
    data["textNumber"] = this.textNumber;
    data["signer"] = this.signer;
    data["approvedBy"] = this.approvedBy;
    data["receivedBy"] = this.receivedBy;
    data["documentTypeId"] = this.documentTypeId;
    data["agencyIssuedId"] = this.agencyIssuedId;
    data["totalPage"] = this.totalPage;
    data["isProcessed"] = this.isProcessed;
    data["categoryName"] = this.categoryName;
    data["performancePerson"] = this.performancePerson;
    data["description"] = this.description;
    data["summaryContent"] = this.summaryContent;
    data["content"] = this.content;
    data["type"] = this.type;
    data["creationId"] = this.creationId;
    data["creationDate"] = this.creationDate
      ? this.creationDate.toISOString()
      : <any>undefined;
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : <any>undefined;
    data["isDeleted"] = this.isDeleted;
    if (Array.isArray(this.appAttachments)) {
      data["appAttachments"] = [];
      for (let item of this.appAttachments)
        data["appAttachments"].push(item.toJSON());
    }
    data["id"] = this.id;
    return data;
  }
}

export interface IDocumentaryDto {
  code?: string | undefined;
  name?: string | undefined;
  releaseDate?: Date | undefined;
  receivedDate?: Date | undefined;
  textNumber?: number | undefined;
  signer?: string | undefined;
  approvedBy?: string | undefined;
  receivedBy?: string | undefined;
  documentTypeId?: number | undefined;
  agencyIssuedId?: number | undefined;
  totalPage?: number | undefined;
  isProcessed?: boolean | undefined;
  categoryName?: string | undefined;
  performancePerson?: string | undefined;
  description?: string | undefined;
  summaryContent?: string | undefined;
  content?: string | undefined;
  type?: number | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  appAttachments?: AppAttachments[] | undefined;
  id?: number | undefined;
  isApproved?: boolean | undefined;
  approvedDepartmentId?: number | undefined;
  approvedUserId?: number | undefined;
  approvedType?: number | undefined;
  approvedContent?: string | undefined;
}
