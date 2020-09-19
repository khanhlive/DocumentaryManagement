export class ConfigDto implements IConfigDto {
  userId?: number | undefined;
  singer?: string | undefined;
  approvedBy?: string | undefined;
  sender?: string | undefined;
  agencyIssuedId?: number | undefined;
  receivedBy?: string | undefined;
  type?: number | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  id?: number | undefined;
  agencyIssuedName?: string | undefined;

  constructor(data?: IConfigDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.singer = "";
      this.approvedBy = "";
      this.sender = "";
      this.agencyIssuedId = 0;
      this.receivedBy = "";
      this.agencyIssuedName = "";
    }
  }

  init(_data?: any) {
    if (_data) {
      this.userId = _data["userId"];
      this.singer = _data["singer"];
      this.approvedBy = _data["approvedBy"];
      this.sender = _data["sender"];
      this.agencyIssuedId = _data["agencyIssuedId"];
      this.receivedBy = _data["receivedBy"];
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
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): ConfigDto {
    data = typeof data === "object" ? data : {};
    let result = new ConfigDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["userId"] = this.userId;
    data["singer"] = this.singer;
    data["approvedBy"] = this.approvedBy;
    data["sender"] = this.sender;
    data["agencyIssuedId"] = this.agencyIssuedId;
    data["receivedBy"] = this.receivedBy;
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
    data["id"] = this.id;
    return data;
  }
}

export interface IConfigDto {
  userId?: number | undefined;
  singer?: string | undefined;
  approvedBy?: string | undefined;
  sender?: string | undefined;
  agencyIssuedId?: number | undefined;
  agencyIssuedName?: string | undefined;
  receivedBy?: string | undefined;
  type?: number | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  id?: number | undefined;
}
