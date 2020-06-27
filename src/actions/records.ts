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
  SetSorting,
  UpdateRecordStart,
  UpdateRecordSuccess,
} from '../types/store/records';
import IRootStore from '../types/store/root';
import { IRecordModel } from '../types/database';

const { ipcRenderer } = window.require("electron");

export const createRecord = (collectionId: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const createRecordStart: CreateRecordStart = {
      type: types.CREATE_RECORD_START
    };

    dispatch(createRecordStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      record: {
        action: 'createRecord',
        args: {
          collectionId
        }
      }
    });
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const createRecordSuccess: CreateRecordSuccess = {
      type: types.CREATE_RECORD_SUCCESS,
      payload: {
        record: response.data.record
      }
    };
    
    dispatch(createRecordSuccess);
  }
}

export const getRecords = (submitedQuery: IRecordsQuery) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getRecordsStart: GetRecordsStart = {
      type: types.GET_RECORDS_START
    };
    
    dispatch(getRecordsStart);

    const { query: currentQuery } = getState().records;
    const query = (submitedQuery === undefined) ? currentQuery : submitedQuery;
    const response = ipcRenderer.sendSync('nbql', {
      records: {
        action: 'getRecords',
        args: {
          ...query,
          related: true
        }
      }
    });

    if (response?.errors?.records) {
      console.log({ recordsError: response.errors.records });
      return;
    }

    const { items: records, related: relatedToRecords } = response.data.records;

    const getRecordsSuccess: GetRecordsSuccess = {
      type: types.GET_RECORDS_SUCCESS,
      payload: { query, records, relatedToRecords }
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
    
    const response = ipcRenderer.sendSync('nbql', {
      record: {
        action: 'getRecord',
        args: { id }
      }
    });
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const getRecordSuccess: GetRecordSuccess = {
      type: types.GET_RECORD_SUCCESS,
      payload: {
        record: response.data.record
      }
    };
    
    dispatch(getRecordSuccess);
  }
}

export const updateRecord = (record: IRecordModel) => {
  return (dispatch: Dispatch) => {
    const updateRecordStart: UpdateRecordStart = {
      type: types.UPDATE_RECORD_START
    };

    dispatch(updateRecordStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      record: {
        action: 'updateRecord',
        args: record
      }
    });
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const updateRecordSuccess: UpdateRecordSuccess = {
      type: types.UPDATE_RECORD_SUCCESS
    };
    
    dispatch(updateRecordSuccess);
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

export const setSorting = (isSorting: boolean) => {
  return (dispatch: Dispatch) => {
    const actionSetSorting: SetSorting = {
      type: types.SET_SORTING,
      payload: { isSorting }
    };
    
    dispatch(actionSetSorting);
  }
}
