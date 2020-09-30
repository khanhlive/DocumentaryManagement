export class CreateRotationDto implements ICreateRotationDto {
  documentId?: number | undefined;
  items?: DepartmentUserTreeViewItem[] | undefined;

  constructor(data?: ICreateRotationDto) {
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
      if (Array.isArray(_data["items"])) {
        this.items = [] as any;
        for (let item of _data["items"])
          this.items!.push(DepartmentUserTreeViewItem.fromJS(item));
      }
    }
  }

  static fromJS(data: any): CreateRotationDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateRotationDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["documentId"] = this.documentId;
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
}

export interface ICreateRotationDto {
  documentId?: number | undefined;
  items?: DepartmentUserTreeViewItem[] | undefined;
}

export class DepartmentUserTreeViewItem implements IDepartmentUserTreeViewItem {
  id?: string | undefined;
  value?: number | undefined;
  name?: string | undefined;
  type?: number | undefined;
  selected?: boolean | undefined;
  isRoot?: boolean | undefined;
  expanded?: boolean | undefined;
  parentId?: number | undefined;
  items?: DepartmentUserTreeViewItem[] | undefined;

  constructor(data?: IDepartmentUserTreeViewItem) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.value = _data["value"];
      this.name = _data["name"];
      this.type = _data["type"];
      this.selected = _data["selected"];
      this.isRoot = _data["isRoot"];
      this.expanded = _data["expanded"];
      this.parentId = _data["parentId"];
      if (Array.isArray(_data["items"])) {
        this.items = [] as any;
        for (let item of _data["items"])
          this.items!.push(DepartmentUserTreeViewItem.fromJS(item));
      }
    }
  }

  static fromJS(data: any): DepartmentUserTreeViewItem {
    data = typeof data === "object" ? data : {};
    let result = new DepartmentUserTreeViewItem();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["value"] = this.value;
    data["name"] = this.name;
    data["type"] = this.type;
    data["selected"] = this.selected;
    data["isRoot"] = this.isRoot;
    data["expanded"] = this.expanded;
    data["parentId"] = this.parentId;
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
}

export interface IDepartmentUserTreeViewItem {
  id?: string | undefined;
  value?: number | undefined;
  name?: string | undefined;
  type?: number | undefined;
  selected?: boolean | undefined;
  isRoot?: boolean | undefined;
  expanded?: boolean | undefined;
  parentId?: number | undefined;
  items?: DepartmentUserTreeViewItem[] | undefined;
}
