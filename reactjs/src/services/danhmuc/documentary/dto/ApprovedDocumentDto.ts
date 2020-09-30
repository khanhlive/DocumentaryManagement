export class ApprovedDocumentDto implements IApprovedDocumentDto {
  approvedContent?: string | undefined;
  isApproved?: boolean | undefined;
  id?: number | undefined;

  constructor(data?: IApprovedDocumentDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.approvedContent = _data["approvedContent"];
      this.isApproved = _data["isApproved"];
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): ApprovedDocumentDto {
    data = typeof data === "object" ? data : {};
    let result = new ApprovedDocumentDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["approvedContent"] = this.approvedContent;
    data["isApproved"] = this.isApproved;
    data["id"] = this.id;
    return data;
  }
}

export interface IApprovedDocumentDto {
  approvedContent?: string | undefined;
  isApproved?: boolean | undefined;
  id?: number | undefined;
}
