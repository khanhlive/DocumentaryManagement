import ServiceBase from "../../ServiceBase";

class DocumentTypeService extends ServiceBase<any, any, any> {
  constructor() {
    super("id", "documenttype");
  }

  public async GetCustomData(): Promise<any> {
    let res = await this.httpBase.get("");
    return this.processResponseData(res);
  }
}

export default new DocumentTypeService();
