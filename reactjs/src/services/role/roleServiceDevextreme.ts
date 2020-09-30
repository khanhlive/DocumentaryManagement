import ServiceBase from "../ServiceBase";

class RoleServiceDevExtreme extends ServiceBase<any, any, any> {
  constructor() {
    super("id", "role");
  }
}

export default new RoleServiceDevExtreme();
