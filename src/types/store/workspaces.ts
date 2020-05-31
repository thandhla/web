
export interface WorkspacesState {
  isLoading: boolean,
  collections: any[],
  relatedCollections: any[],
  collection: any,
  created: any,
}

export enum WorkspaceActionTypes {
  GET_COLLECTIONS_START = 'GET_COLLECTIONS_START',
  GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS'
}

export interface IActionGetCollectionsFetch {
  type: WorkspaceActionTypes.GET_COLLECTIONS_START
}

export interface IActionGetCollectionsSuccess {
  type: WorkspaceActionTypes.GET_COLLECTIONS_SUCCESS
}

export type WorkspacesActions = IActionGetCollectionsSuccess | IActionGetCollectionsFetch;
