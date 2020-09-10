import ServiceBase from "../../ServiceBase";
import { AgencyIssuedDto } from "./dto/AgencyIssuedDto";
import CreateAgencyIssuedDto from "./dto/CreateAgencyIssuedDto";
import UpdateAgencyIssuedDto from "./dto/UpdateAgencyIssuedDto";

class AgencyIssuedService extends ServiceBase<
  AgencyIssuedDto,
  CreateAgencyIssuedDto,
  UpdateAgencyIssuedDto
> {
  constructor() {
    super("id", "agencyissued");
  }

  public async GetCustomData(): Promise<any> {
    let res = await this.httpBase.get("");
    return this.processResponseData(res);
  }
}

export default new AgencyIssuedService();
