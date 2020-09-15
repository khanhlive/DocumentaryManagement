export class UpdateAttachmentDto implements IUpdateAttachmentDto {
  documentaryId?: number | undefined;
  documentaryPersonalId?: number | undefined;
  name?: string | undefined;
  url?: string | undefined;
  size?: number | undefined;
  fileType?: string | undefined;
  type?: number | undefined;
  id?: number | undefined;

  constructor(data?: IUpdateAttachmentDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.documentaryId = _data["documentaryId"];
      this.documentaryPersonalId = _data["documentaryPersonalId"];
      this.name = _data["name"];
      this.url = _data["url"];
      this.size = _data["size"];
      this.fileType = _data["fileType"];
      this.type = _data["type"];
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): UpdateAttachmentDto {
    data = typeof data === "object" ? data : {};
    let result = new UpdateAttachmentDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["documentaryId"] = this.documentaryId;
    data["documentaryPersonalId"] = this.documentaryPersonalId;
    data["name"] = this.name;
    data["url"] = this.url;
    data["size"] = this.size;
    data["fileType"] = this.fileType;
    data["type"] = this.type;
    data["id"] = this.id;
    return data;
  }
}

export interface IUpdateAttachmentDto {
  documentaryId?: number | undefined;
  documentaryPersonalId?: number | undefined;
  name?: string | undefined;
  url?: string | undefined;
  size?: number | undefined;
  fileType?: string | undefined;
  type?: number | undefined;
  id?: number | undefined;
}
