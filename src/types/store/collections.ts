import { ICollectionModel } from '../database';

export default interface ICollectionsState {
  isFetchingOne: boolean,
  isFetchingList: boolean,
  isCreating: boolean,
  relatedCollections: ICollectionModel[],
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
  CLEAR_COLLECTIONS = 'CLEAR_COLLECTIONS',
  CLEAR_COLLECTION = 'CLEAR_COLLECTION',
}

export interface CreateCollectionStart {
  type: ICollectionActionTypes.CREATE_COLLECTION_START;
}

export interface CreateCollectionSuccess {
  type: ICollectionActionTypes.CREATE_COLLECTION_SUCCESS;
  payload: {
    collection: ICollectionModel;
  }
}

export interface GetCollectionsStart {
  type: ICollectionActionTypes.GET_COLLECTIONS_START
}

export interface GetCollectionsSuccess {
  type: ICollectionActionTypes.GET_COLLECTIONS_SUCCESS;
  payload: {
    collections: ICollectionModel[];
  }
}

export interface GetCollectionStart {
  type: ICollectionActionTypes.GET_COLLECTION_START
}

export interface GetCollectionSuccess {
  type: ICollectionActionTypes.GET_COLLECTION_SUCCESS;
  payload: {
    collection: ICollectionModel;
    relatedCollections: ICollectionModel[];
  }
}

export interface ClearCollections {
  type: ICollectionActionTypes.CLEAR_COLLECTIONS;
}

export interface ClearCollection {
  type: ICollectionActionTypes.CLEAR_COLLECTION;
}

export type ICollectionsAction =
  | CreateCollectionStart
  | CreateCollectionSuccess
  | GetCollectionsStart
  | GetCollectionsSuccess
  | GetCollectionStart
  | GetCollectionSuccess
  | ClearCollections
  | ClearCollection;
