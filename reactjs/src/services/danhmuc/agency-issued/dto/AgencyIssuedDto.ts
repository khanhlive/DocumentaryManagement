export class AgencyIssuedDto implements IAgencyIssuedDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  //appDocumentary?: AppDocumentary[] | undefined;
  //appDocumentaryPersonal?: AppDocumentaryPersonal[] | undefined;
  //appConfig?: AppConfig[] | undefined;
  id?: number | undefined;

  constructor(data?: IAgencyIssuedDto) {
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
      this.description = _data["description"];
      this.creationId = _data["creationId"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      this.isDeleted = _data["isDeleted"];
      //   if (Array.isArray(_data["appDocumentary"])) {
      //     this.appDocumentary = [] as any;
      //     for (let item of _data["appDocumentary"])
      //       this.appDocumentary!.push(AppDocumentary.fromJS(item));
      //   }
      //   if (Array.isArray(_data["appDocumentaryPersonal"])) {
      //     this.appDocumentaryPersonal = [] as any;
      //     for (let item of _data["appDocumentaryPersonal"])
      //       this.appDocumentaryPersonal!.push(
      //         AppDocumentaryPersonal.fromJS(item)
      //       );
      //   }
      //   if (Array.isArray(_data["appConfig"])) {
      //     this.appConfig = [] as any;
      //     for (let item of _data["appConfig"])
      //       this.appConfig!.push(AppConfig.fromJS(item));
      //   }
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): AgencyIssuedDto {
    data = typeof data === "object" ? data : {};
    let result = new AgencyIssuedDto();
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
    data["isDeleted"] = this.isDeleted;
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
    // if (Array.isArray(this.appConfig)) {
    //   data["appConfig"] = [];
    //   for (let item of this.appConfig) data["appConfig"].push(item.toJSON());
    // }
    data["id"] = this.id;
    return data;
  }
}

export interface IAgencyIssuedDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  //appDocumentary?: AppDocumentary[] | undefined;
  //appDocumentaryPersonal?: AppDocumentaryPersonal[] | undefined;
  //appConfig?: AppConfig[] | undefined;
  id?: number | undefined;
}
