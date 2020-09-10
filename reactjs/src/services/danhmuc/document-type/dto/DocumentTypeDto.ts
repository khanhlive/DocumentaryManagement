export interface IDocumentTypeDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  //appDocumentary?: AppDocumentary[] | undefined;
  //appDocumentaryPersonal?: AppDocumentaryPersonal[] | undefined;
  id?: number | undefined;
}
export class DocumentTypeDto implements IDocumentTypeDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  //appDocumentary?: AppDocumentary[] | undefined;
  //appDocumentaryPersonal?: AppDocumentaryPersonal[] | undefined;
  id?: number | undefined;

  constructor(data?: IDocumentTypeDto) {
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

      // if (Array.isArray(_data["appDocumentary"])) {
      //   this.appDocumentary = [] as any;
      //   for (let item of _data["appDocumentary"])
      //     //this.appDocumentary!.push(AppDocumentary.fromJS(item));
      // }
      // if (Array.isArray(_data["appDocumentaryPersonal"])) {
      //   this.appDocumentaryPersonal = [] as any;
      //   for (let item of _data["appDocumentaryPersonal"])
      //     this.appDocumentaryPersonal!.push(
      //       //AppDocumentaryPersonal.fromJS(item)
      //     );
      // }
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): DocumentTypeDto {
    data = typeof data === "object" ? data : {};
    let result = new DocumentTypeDto();
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
    // if (Array.isArray(this.appDocumentary)) {
    //   data["appDocumentary"] = [];
    //   for (let item of this.appDocumentary)
    //     data["appDocumentary"].push(item.toJSON());
    // }
    // if (Array.isArray(this.appDocumentaryPersonal)) {
    //   data["appDocumentaryPersonal"] = [];
    //   for (let item of this.appDocumentaryPersonal)
    //     data["appDocumentaryPersonal"].push(item.toJSON());
    // }
    data["id"] = this.id;
    return data;
  }
}
