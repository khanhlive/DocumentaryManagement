import { CreateOrUpdateUserInput } from "./dto/createOrUpdateUserInput";
import { EntityDto } from "../../services/dto/entityDto";
import { UpdateUserInput } from "./dto/updateUserInput";
import ServiceBase from "../ServiceBase";

class UserMainService extends ServiceBase<
  EntityDto,
  CreateOrUpdateUserInput,
  UpdateUserInput
> {
  constructor() {
    super("id", "user");
  }
}

export default new UserMainService();
