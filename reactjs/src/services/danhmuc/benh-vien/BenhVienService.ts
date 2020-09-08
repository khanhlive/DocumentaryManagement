import ServiceBase from "../../ServiceBase";

class BenhVienService extends ServiceBase<any, any, any> {
  constructor() {
    super("id", "benhvien");
  }

  public async GetCustomData(): Promise<any> {
    let res = await this.httpBase.get("");
    return this.processResponseData(res);
  }
}

export default new BenhVienService();
