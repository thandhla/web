import { ICollectionField } from "./database";

export interface IFieldComponent {
  field: ICollectionField;
  data: any;
  edit: boolean;
  style: any;
  onFocus: any;
  onBlur: any;
  update: any;
}
