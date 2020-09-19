export class ProvinceDto implements IProvinceDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  level?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  //users?: User[] | undefined;
  id?: number | undefined;

  constructor(data?: IProvinceDto) {
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
      this.level = _data["level"];
      this.creationId = _data["creationId"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
      this.updatedId = _data["updatedId"];
      this.updatedDate = _data["updatedDate"]
        ? new Date(_data["updatedDate"].toString())
        : <any>undefined;
      this.isDeleted = _data["isDeleted"];
      // if (Array.isArray(_data["users"])) {
      //   this.users = [] as any;
      //   for (let item of _data["users"]) this.users!.push(User.fromJS(item));
      // }
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): ProvinceDto {
    data = typeof data === "object" ? data : {};
    let result = new ProvinceDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    data["description"] = this.description;
    data["level"] = this.level;
    data["creationId"] = this.creationId;
    data["creationDate"] = this.creationDate
      ? this.creationDate.toISOString()
      : <any>undefined;
    data["updatedId"] = this.updatedId;
    data["updatedDate"] = this.updatedDate
      ? this.updatedDate.toISOString()
      : <any>undefined;
    data["isDeleted"] = this.isDeleted;
    // if (Array.isArray(this.users)) {
    //   data["users"] = [];
    //   for (let item of this.users) data["users"].push(item.toJSON());
    // }
    data["id"] = this.id;
    return data;
  }
}

export interface IProvinceDto {
  code?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  level?: string | undefined;
  creationId?: number | undefined;
  creationDate?: Date | undefined;
  updatedId?: number | undefined;
  updatedDate?: Date | undefined;
  isDeleted?: boolean | undefined;
  //users?: User[] | undefined;
  id?: number | undefined;
}
