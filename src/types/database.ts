
export interface IWorkspaceModel {
  id: string;
  name: string;
}

export interface IMainDB {
  workspaces: IWorkspaceModel[],
}

export enum IViewTypes {
  list = 'list',
  table = 'table'
}

export enum IFieldTypes {
  line = 'line'
}

export interface IDropDownFieldChoices {
  value: string;
  label: string
}

export interface ICollectionField {
  id: string;
  label: string;
  type: IFieldTypes;
}

export interface IDropDownField extends ICollectionField {
  options: {
    choices: IDropDownFieldChoices[]
  };
}

export interface ILineField extends ICollectionField {
  options: null;
}

export type ICollectionFields = 
  | ILineField
  | IDropDownField;

export interface IViewModel {
  id: string;
  collectionId: string;
  type: IViewTypes;
  fields: string[];
  options: any;
}

export interface ICollectionModel {
  id: string;
  workspaceId: string;
  name: string;
  defaultView: string;
  fields: ICollectionField[];
  views: IViewModel[];
}

export interface IRecordModel {
  id: string;
  collectionId: string;
  fields: any;
}
