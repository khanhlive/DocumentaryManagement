export class RotationDto implements IRotationDto {
  documentId?: number | undefined;
  userId?: number | undefined;
  departmentId?: number | undefined;
  date?: Date | undefined;
  id?: number | undefined;

  constructor(data?: IRotationDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.documentId = _data["documentId"];
      this.userId = _data["userId"];
      this.departmentId = _data["departmentId"];
      this.date = _data["date"]
        ? new Date(_data["date"].toString())
        : <any>undefined;
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): RotationDto {
    data = typeof data === "object" ? data : {};
    let result = new RotationDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["documentId"] = this.documentId;
    data["userId"] = this.userId;
    data["departmentId"] = this.departmentId;
    data["date"] = this.date ? this.date.toISOString() : <any>undefined;
    data["id"] = this.id;
    return data;
  }
}

export interface IRotationDto {
  documentId?: number | undefined;
  userId?: number | undefined;
  departmentId?: number | undefined;
  date?: Date | undefined;
  id?: number | undefined;
}
