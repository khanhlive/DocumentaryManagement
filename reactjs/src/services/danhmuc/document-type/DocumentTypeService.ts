import ServiceBase from "../../ServiceBase";
import { DocumentTypeDto } from "./dto/DocumentTypeDto";
import { CreateDocumentTypeDto } from "./dto/CreateDocumentTypeDto";
import { UpdateDocumentTypeDto } from "./dto/UpdateDocumentTypeDto";

class DocumentTypeService extends ServiceBase<
  DocumentTypeDto,
  CreateDocumentTypeDto,
  UpdateDocumentTypeDto
> {
  constructor() {
    super("id", "documenttype");
  }

  public async GetCustomData(): Promise<any> {
    let res = await this.httpBase.get("");
    return this.processResponseData(res);
  }
}

export default new DocumentTypeService();
