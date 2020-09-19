import { ConfigDto } from "../../../app/features/systems/Dto/ConfigDto";
import ServiceBase from "../../ServiceBase";

class ConfigService extends ServiceBase<any, any, any> {
  constructor() {
    super("id", "config");
  }
  cacheKey: string = "qlvb-config";
  public async getConfig(): Promise<any> {
    let res = await this.httpBase.get(
      `/api/services/app/${this.entityName}/get-config`
    );
    return this.processResponseData(res);
  }

  public async updateConfig(input: any | null | undefined): Promise<any> {
    let res = await this.httpBase.post(
      `/api/services/app/${this.entityName}/update-config`,
      input
    );
    return this.processResponseData(res);
  }

  public refreshCache() {
    this.getConfig().then((res) => {
      this.setCache(JSON.stringify(res));
    });
  }
  public setCache(data: any) {
    this.getConfig().then((res) => {
      localStorage.setItem(this.cacheKey, JSON.stringify(res));
    });
  }

  public getCacheField(field: string) {
    let cache = this.getCache();
    return cache[field] || "";
  }

  public getCache() {
    let localItem = localStorage.getItem(this.cacheKey);
    if (localItem) {
      return JSON.parse(localItem);
    } else {
      return new ConfigDto();
    }
  }
}

export default new ConfigService();
