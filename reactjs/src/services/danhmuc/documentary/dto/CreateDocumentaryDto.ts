import { FileUploadInfo } from "../../../../common/core/models/Attachment";
import moment from "moment";

export default class CreateDocumentaryDto implements ICreateDocumentaryDto {
  code?: string | undefined;
  name?: string | undefined;
  releaseDate?: string | undefined;
  receivedDate?: string | undefined;
  textNumber?: string | undefined;
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
  appAttachments?: FileUploadInfo[] | undefined;

  constructor(data?: ICreateDocumentaryDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      let _date = moment(new Date());
      this.code = "";
      this.name = "";
      this.releaseDate = _date.format("DD/MM/YYYY");
      this.receivedDate = _date.format("DD/MM/YYYY");
      this.textNumber = "";
      this.signer = "";
      this.approvedBy = "";
      this.receivedBy = "";
      this.totalPage = 1;
      this.isProcessed = false;
      this.categoryName = "";
      this.performancePerson = "";
      this.description = "";
      this.summaryContent = "";
      this.content = "";
      this.appAttachments = [];
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
    }
  }

  static fromJS(data: any): CreateDocumentaryDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateDocumentaryDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["releaseDate"] = this.releaseDate;
    //? this.releaseDate.toISOString()
    ///: <any>undefined;
    data["receivedDate"] = this.receivedDate;
    //? this.receivedDate.toISOString()
    //: <any>undefined;
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
    return data;
  }
}

export interface ICreateDocumentaryDto {
  code?: string | undefined;
  name?: string | undefined;
  releaseDate?: string | undefined;
  receivedDate?: string | undefined;
  textNumber?: string | undefined;
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
  appAttachments?: FileUploadInfo[] | undefined;
}
