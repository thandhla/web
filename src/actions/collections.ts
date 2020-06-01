import { Dispatch } from 'redux';
import {
  ICollectionActionTypes as types,
  CreateCollectionStart,
  CreateCollectionSuccess,
  GetCollectionsStart,
  GetCollectionsSuccess,
  GetCollectionStart,
  GetCollectionSuccess,
} from '../types/store/collections';
import RootStore from '../types/store/root';

const { ipcRenderer } = window.require("electron");

export const createCollection = (name: string) => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const createCollectionStart: CreateCollectionStart = {
      type: types.CREATE_COLLECTION_START
    };
    
    dispatch(createCollectionStart);

    const queries = {
      collection: {
        action: 'createCollection',
        args: { name }
      }
    };
    const response = ipcRenderer.sendSync('nbql', [null, queries]);
    const createCollectionSuccess: CreateCollectionSuccess = {
      type: types.CREATE_COLLECTION_SUCCESS,
      collection: response.data.collection 
    };
    
    dispatch(createCollectionSuccess);
  }
}

export const getCollections = (id: string) => {
  return (dispatch: Dispatch, getState: any) => {
    const getCollectionsStart: GetCollectionsStart = {
      type: types.GET_COLLECTIONS_START
    };
    
    dispatch(getCollectionsStart);

    const store: RootStore = getState();
    const workspaceId = store.workspaces.workspace?.id;
    const queries = {
      collections: {
        action: 'getCollections'
      }
    };
    const response = ipcRenderer.sendSync('nbql', [workspaceId, queries]);
    const getCollectionsSuccess: GetCollectionsSuccess = {
      type: types.GET_COLLECTIONS_SUCCESS,
      collections: response.data.collections 
    };
    
    dispatch(getCollectionsSuccess);
  }
}

export const getCollection = (id: string) => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const getCollectionStart: GetCollectionStart = {
      type: types.GET_COLLECTION_START
    };
    
    dispatch(getCollectionStart);
    
    const queries = {
      collection: {
        action: 'getCollection',
        args: { id }
      }
    };
    const response = ipcRenderer.sendSync('nbql', [null, queries]);
    const getCollectionSuccess: GetCollectionSuccess = {
      type: types.GET_COLLECTION_SUCCESS,
      collection: response.data.collection
    };
    
    dispatch(getCollectionSuccess);
  }
}
