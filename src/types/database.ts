
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

export interface IViewModel {
  id: string;
  type: IViewTypes;
}

export interface ICollectionField {
  id: string;
  label: string;
  options: any;
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
