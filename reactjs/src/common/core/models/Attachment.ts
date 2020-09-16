import { IAppAttachments } from "../../../services/danhmuc/attachment/dto/AppAttachments";
export interface IDocumentaryType {
  DocumentaryAway: number;
  DocumentaryArrived: number;
  DocumentaryPersonal: number;
}
export const DocumentaryType: IDocumentaryType = {
  DocumentaryAway: 1,
  DocumentaryArrived: 2,
  DocumentaryPersonal: 3,
};
export interface IAttachmentsItemProps {
  file?: FileUploadInfo;
  onSuccess?: (fileInfo?: FileUploadInfo) => any;
  onDelete?: (fileInfo?: FileUploadInfo) => any;
  readOnly?: boolean;
}
export interface IAttachmentsItemState {
  fileUpload?: FileUploadInfo;
  progress?: number;
}
export interface FileUploadInfo extends IAppAttachments {
  content?: any;
  isUpload?: boolean;
  guid?: string;
}

export interface IAttachmentCommonProps {
  accessType?: string;
  multiple?: boolean;
  onChange?: (files: FileUploadInfo[], filesDelete: FileUploadInfo[]) => any;
  type: number;
  id: number;
  readOnly?: boolean;
}
export interface IAttachmentCommonStates {
  maxSize?: number;
  files?: FileUploadInfo[];
  filesDelete?: FileUploadInfo[];
}
