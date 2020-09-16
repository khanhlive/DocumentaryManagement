import { DocumentaryType } from "./Attachment";

export default class SearchOptionDto {
  constructor(data?: any) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    } else {
      this.type = DocumentaryType.DocumentaryAway;
      this.code = "";
      this.noiBanHanh = "";
      this.noiDungTomTat = "";
      this.ngayBanHanhTu = "";
      this.ngayBanHanhDen = "";
      this.ngayGuiTu = "";
      this.ngayGuiDen = "";
    }
  }
  code?: string | undefined;
  noiBanHanh?: string | undefined;
  noiDungTomTat?: string | undefined;
  type?: number;
  ngayBanHanhTu?: string | undefined;
  ngayBanHanhDen?: string | undefined;
  ngayGuiTu?: string | undefined;
  ngayGuiDen?: string | undefined;
}
