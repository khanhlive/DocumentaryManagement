import ServiceBase from "../../ServiceBase";
import { CreateRotationDto } from "./dto/CreateRotationDto";
import { RotationDto } from "./dto/RotationDto";

class RotationService extends ServiceBase<
  RotationDto,
  CreateRotationDto,
  RotationDto
> {
  constructor() {
    super("id", "rotation");
  }
  public async send(
    input: CreateRotationDto | null | undefined
  ): Promise<RotationDto[]> {
    let res = await this.httpBase.post(
      `/api/services/app/${this.entityName}/send`,
      input
    );
    return this.processResponseData(res);
  }
  public async view(documentId: number): Promise<RotationDto[]> {
    let res = await this.httpBase.get(
      `/api/services/app/${this.entityName}/view`,
      {
        params: {
          documentId: documentId,
        },
      }
    );
    return this.processResponseData(res);
  }
}

export default new RotationService();
