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
}

export default new AgencyIssuedService();
