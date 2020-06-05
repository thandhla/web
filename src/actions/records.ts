import { Dispatch } from 'redux';
import {
  IRecordActionTypes as types,
  CreateRecordStart,
  CreateRecordSuccess,
  GetRecordsStart,
  GetRecordsSuccess,
  GetRecordStart,
  GetRecordSuccess,
  ClearRecords,
  ClearRecord,
  IRecordsQuery,
} from '../types/store/records';
import IRootStore from '../types/store/root';

const { ipcRenderer } = window.require("electron");

export const createRecord = (record: {
  name: string
}) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const createRecordStart: CreateRecordStart = {
      type: types.CREATE_RECORD_START
    };

    dispatch(createRecordStart);
    
    const queries = {
      record: {
        action: 'createRecord',
        args: record
      }
    };
    const workspaceId = getState().workspaces.workspace?.id;
    const response = ipcRenderer.sendSync('nbql', [workspaceId, queries]);
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const createRecordSuccess: CreateRecordSuccess = {
      type: types.CREATE_RECORD_SUCCESS,
      record: response.data.record 
    };
    
    dispatch(createRecordSuccess);
  }
}

export const getRecords = (workspaceId: string, submitedQuery: IRecordsQuery) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getRecordsStart: GetRecordsStart = {
      type: types.GET_RECORDS_START
    };
    
    dispatch(getRecordsStart);

    const { query } = getState().records;
    const updatedQuery = (submitedQuery === undefined) ? query : submitedQuery;
    const queries = {
      records: {
        action: 'getRecords',
        args: updatedQuery
      }
    };
    const response = ipcRenderer.sendSync('nbql', [workspaceId, queries]);

    if (response?.errors?.records) {
      console.log({ recordsError: response.errors.records });
      return;
    }

    const getRecordsSuccess: GetRecordsSuccess = {
      type: types.GET_RECORDS_SUCCESS,
      records: response.data.records 
    };
    
    dispatch(getRecordsSuccess);
  }
}

export const getRecord = (id: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getRecordStart: GetRecordStart = {
      type: types.GET_RECORD_START
    };
    
    dispatch(getRecordStart);
    
    const queries = {
      record: {
        action: 'getRecord',
        args: { id }
      }
    };
    const workspaceId = getState().workspaces.workspace?.id;
    
    if (!workspaceId) return;

    const response = ipcRenderer.sendSync('nbql', [workspaceId, queries]);
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const getRecordSuccess: GetRecordSuccess = {
      type: types.GET_RECORD_SUCCESS,
      record: response.data.record
    };
    
    dispatch(getRecordSuccess);
  }
}

export const clearRecords = () => {
  return (dispatch: Dispatch) => {
    const actionClearRecords: ClearRecords = {
      type: types.CLEAR_RECORDS,
    };
    
    dispatch(actionClearRecords);
  }
}

export const clearRecord = () => {
  return (dispatch: Dispatch) => {
    const actionClearRecord: ClearRecord = {
      type: types.CLEAR_RECORD,
    };
    
    dispatch(actionClearRecord);
  }
}
