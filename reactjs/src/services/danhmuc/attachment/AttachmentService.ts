import ServiceBase from "../../ServiceBase";
import AppAttachments from "./dto/AppAttachments";
import { CreateAttachmentDto } from "./dto/CreateAttachmentDto";
import { UpdateAttachmentDto } from "./dto/UpdateAttachmentDto";

class AttachmentService extends ServiceBase<
  AppAttachments,
  CreateAttachmentDto,
  UpdateAttachmentDto
> {
  constructor() {
    super("id", "attachment");
  }
  public async upload(file: any): Promise<AppAttachments> {
    let formData = new FormData();
    /*
          Iteate over any file sent over appending the files
          to the form data.
        */

    formData.append("file", file);
    let res = await this.httpBase.post(
      "/api/services/app/attachment/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return this.processResponseData(res);
  }
  public async GetByDocumentaryPersonalId(
    documentatyPersonalId: number
  ): Promise<AppAttachments[]> {
    let res = await this.httpBase.get(
      "/api/services/app/attachment/get-by-document-personal-id",
      {
        params: { documentarypersonalid: documentatyPersonalId },
      }
    );
    return this.processResponseData(res);
  }
  public async GetByDocumentaryId(
    documentaryId: number,
    type: number
  ): Promise<AppAttachments[]> {
    let res = await this.httpBase.get(
      "/api/services/app/attachment/get-by-document-id",
      {
        params: {
          documentaryId: documentaryId,
          type: type,
        },
      }
    );
    return this.processResponseData(res);
  }
}

export default new AttachmentService();
