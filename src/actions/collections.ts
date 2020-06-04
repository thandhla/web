import { Dispatch } from 'redux';
import {
  ICollectionActionTypes as types,
  CreateCollectionStart,
  CreateCollectionSuccess,
  GetCollectionsStart,
  GetCollectionsSuccess,
  GetCollectionStart,
  GetCollectionSuccess,
  ClearCollections,
  ClearCollection,
} from '../types/store/collections';
import RootStore from '../types/store/root';

const { ipcRenderer } = window.require("electron");

export const createCollection = (collection: {
  name: string
}) => {
  return (dispatch: Dispatch, getState: () => RootStore) => {
    const createCollectionStart: CreateCollectionStart = {
      type: types.CREATE_COLLECTION_START
    };

    dispatch(createCollectionStart);
    
    const queries = {
      collection: {
        action: 'createCollection',
        args: collection
      }
    };
    const workspaceId = getState().workspaces.workspace?.id;
    const response = ipcRenderer.sendSync('nbql', [workspaceId, queries]);
    
    if (response?.errors?.collection) {
      console.log({ collectionError: response.errors.collection });
      return;
    }

    const createCollectionSuccess: CreateCollectionSuccess = {
      type: types.CREATE_COLLECTION_SUCCESS,
      collection: response.data.collection 
    };
    
    dispatch(createCollectionSuccess);
  }
}

export const getCollections = (workspaceId: string) => {
  return (dispatch: Dispatch) => {
    const getCollectionsStart: GetCollectionsStart = {
      type: types.GET_COLLECTIONS_START
    };
    
    dispatch(getCollectionsStart);

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
  return (dispatch: Dispatch, getState: () => RootStore) => {
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
    const workspaceId = getState().workspaces.workspace?.id;
    
    if (!workspaceId) return;

    const response = ipcRenderer.sendSync('nbql', [workspaceId, queries]);
    
    if (response?.errors?.collection) {
      console.log({ collectionError: response.errors.collection });
      return;
    }

    const getCollectionSuccess: GetCollectionSuccess = {
      type: types.GET_COLLECTION_SUCCESS,
      collection: response.data.collection
    };
    
    dispatch(getCollectionSuccess);
  }
}

export const clearCollections = () => {
  return (dispatch: Dispatch) => {
    const actionClearCollections: ClearCollections = {
      type: types.CLEAR_COLLECTIONS,
    };
    
    dispatch(actionClearCollections);
  }
}

export const clearCollection = () => {
  return (dispatch: Dispatch) => {
    const actionClearCollection: ClearCollection = {
      type: types.CLEAR_COLLECTION,
    };
    
    dispatch(actionClearCollection);
  }
}
