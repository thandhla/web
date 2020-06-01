import { ICollectionModel } from '../database/workspaceDB';

export interface ICollectionsState {
  isFetchingOne: boolean,
  isFetchingList: boolean,
  isCreating: boolean,
  collections: ICollectionModel[],
  collection: null | ICollectionModel,
}

export enum ICollectionActionTypes {
  CREATE_COLLECTION_START = 'CREATE_COLLECTION_START',
  CREATE_COLLECTION_SUCCESS = 'CREATE_COLLECTION_SUCCESS',
  GET_COLLECTIONS_START = 'GET_COLLECTIONS_START',
  GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS',
  GET_COLLECTION_START = 'GET_COLLECTION_START',
  GET_COLLECTION_SUCCESS = 'GET_COLLECTION_SUCCESS',
}

export interface CreateCollectionStart {
  type: ICollectionActionTypes.CREATE_COLLECTION_START;
}

export interface CreateCollectionSuccess {
  type: ICollectionActionTypes.CREATE_COLLECTION_SUCCESS;
  collection: ICollectionModel;
}

export interface GetCollectionsStart {
  type: ICollectionActionTypes.GET_COLLECTIONS_START
}

export interface GetCollectionsSuccess {
  type: ICollectionActionTypes.GET_COLLECTIONS_SUCCESS;
  collections: ICollectionModel[];
}

export interface GetCollectionStart {
  type: ICollectionActionTypes.GET_COLLECTION_START
}

export interface GetCollectionSuccess {
  type: ICollectionActionTypes.GET_COLLECTION_SUCCESS;
  collection: ICollectionModel;
}

export type ICollectionsAction =
  | CreateCollectionStart
  | CreateCollectionSuccess
  | GetCollectionsStart
  | GetCollectionsSuccess
  | GetCollectionStart
  | GetCollectionSuccess;
