export default interface IEditComponentProps {
  id?: number;
  model?: any;
  //isShow?: boolean,
  onSave?: (id: number, model: any) => any;
  onCancle?: () => any;
}
