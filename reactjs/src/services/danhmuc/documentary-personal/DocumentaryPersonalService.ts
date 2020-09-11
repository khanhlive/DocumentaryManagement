import ServiceBase from "../../ServiceBase";
import DocumentaryPersonalDto from "./dto/DocumentaryPersonalDto";
import CreateDocumentaryPersonalDto from "./dto/CreateDocumentaryPersonalDto";
import UpdateDocumentaryPersonalDto from "./dto/UpdateDocumentaryPersonalDto";

class DocumentaryPersonalService extends ServiceBase<
  DocumentaryPersonalDto,
  CreateDocumentaryPersonalDto,
  UpdateDocumentaryPersonalDto
> {
  constructor() {
    super("id", "DocumentaryPersonal");
  }
}

export default new DocumentaryPersonalService();
