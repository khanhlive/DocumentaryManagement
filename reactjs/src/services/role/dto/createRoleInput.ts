export interface CreateRoleInput {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  grantedPermissions: string[];
}

export class CreateRoleInput implements CreateRoleInput {
  name!: string;
  displayName!: string;
  normalizedName!: string;
  description!: string;
  grantedPermissions!: string[];

  constructor(data?: CreateRoleInput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.name = "";
      this.displayName = "";
      this.normalizedName = "";
      this.description = "";
      this.grantedPermissions = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.normalizedName = _data["normalizedName"];
      this.description = _data["description"];
      if (Array.isArray(_data["grantedPermissions"])) {
        this.grantedPermissions = [] as any;
        for (let item of _data["grantedPermissions"])
          this.grantedPermissions!.push(item);
      }
    }
  }

  static fromJS(data: any): CreateRoleInput {
    data = typeof data === "object" ? data : {};
    let result = new CreateRoleInput();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["normalizedName"] = this.normalizedName;
    data["description"] = this.description;
    if (Array.isArray(this.grantedPermissions)) {
      data["grantedPermissions"] = [];
      for (let item of this.grantedPermissions)
        data["grantedPermissions"].push(item);
    }
    return data;
  }
}
