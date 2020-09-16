import { observable, action } from "mobx";

class BreadcrumbStoreApp {
  constructor() {
    this.items = ["Home"];
    this.useBigBreadcrum = true;
    this.useStats = true;
  }
  @observable items?: any[];
  @observable useBigBreadcrum?: boolean;
  @observable useStats?: boolean;
  @action
  setItems(items: any) {
    this.items = ["Home"];
    this.items = this.items.concat(items);
  }
}
export default BreadcrumbStoreApp;
