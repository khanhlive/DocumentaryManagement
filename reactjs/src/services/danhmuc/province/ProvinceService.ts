import ServiceBase from "../../ServiceBase";
import { ProvinceDto } from "./dto/ProvinceDto";
import { CreateProvinceDto } from "./dto/CreateProvinceDto";
import { UpdateProvinceDto } from "./dto/UpdateProvinceDto";

class ProvinceService extends ServiceBase<
  ProvinceDto,
  CreateProvinceDto,
  UpdateProvinceDto
> {
  constructor() {
    super("id", "province");
  }
}

export default new ProvinceService();
