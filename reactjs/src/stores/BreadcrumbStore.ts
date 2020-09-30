import { observable, action } from "mobx";

class BreadcrumbStoreApp {
  constructor() {
    this.items = ["Trang chủ"];
    this.useBigBreadcrum = true;
    this.useStats = false;
  }
  @observable items?: any[];
  @observable useBigBreadcrum?: boolean;
  @observable useStats?: boolean;
  @action
  setItems(items: any) {
    this.items = ["Trang chủ"];
    this.items = this.items.concat(items);
  }
}
export default BreadcrumbStoreApp;
