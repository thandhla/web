
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

export interface ICollectionField {
  id: string;
  label: string;
  type: IFieldTypes;
  options: any;
}

export interface IViewModel {
  id: string;
  type: IViewTypes;
  fields: string[];
}

export interface ICollectionModel {
  id: string;
  name: string;
  defaultView: string;
  fields: ICollectionField[];
  views: IViewModel[];
}

export interface IRecordModel {
  id: string;
  collection: string;
  fields: any;
}