import { IRecordModel } from '../database';

export interface IRecordsSort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface IRecordsFilter {
  field: string;
  comparison: string;
  value: string;
}

export interface IRecordsQuery {
  collectionId: string;
  sorts: IRecordsSort[];
}

export default interface IRecordsState {
  isFetchingOne: boolean;
  isFetchingList: boolean;
  isCreating: boolean;
  isNew: boolean;
  isSorting: boolean;
  records: IRecordModel[];
  record: null | IRecordModel;
  relatedToRecords: IRecordModel[],
  relatedToRecord: IRecordModel[],
  query: IRecordsQuery;
}

export enum IRecordActionTypes {
  CREATE_RECORD_START = 'CREATE_RECORD_START',
  CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS',
  GET_RECORDS_START = 'GET_RECORDS_START',
  GET_RECORDS_SUCCESS = 'GET_RECORDS_SUCCESS',
  GET_RECORD_START = 'GET_RECORD_START',
  GET_RECORD_SUCCESS = 'GET_RECORD_SUCCESS',
  CLEAR_RECORDS = 'CLEAR_RECORDS',
  CLEAR_RECORD = 'CLEAR_RECORD',
  SET_SORTING = 'SET_SORTING',
}

export interface CreateRecordStart {
  type: IRecordActionTypes.CREATE_RECORD_START;
}

export interface CreateRecordSuccess {
  type: IRecordActionTypes.CREATE_RECORD_SUCCESS;
  payload: {
    record: IRecordModel;
  }
}

export interface GetRecordsStart {
  type: IRecordActionTypes.GET_RECORDS_START
}

export interface GetRecordsSuccess {
  type: IRecordActionTypes.GET_RECORDS_SUCCESS;
  payload: {
    query: IRecordsQuery;
    records: IRecordModel[];
    relatedToRecords: IRecordModel[];
  }
}

export interface GetRecordStart {
  type: IRecordActionTypes.GET_RECORD_START
}

export interface GetRecordSuccess {
  type: IRecordActionTypes.GET_RECORD_SUCCESS;
  payload: {
    record: IRecordModel;
  }
}

export interface ClearRecords {
  type: IRecordActionTypes.CLEAR_RECORDS;
}

export interface ClearRecord {
  type: IRecordActionTypes.CLEAR_RECORD;
}

export interface SetSorting {
  type: IRecordActionTypes.SET_SORTING;
  payload: {
    isSorting: boolean;
  }
}

export type IRecordsAction =
  | CreateRecordStart
  | CreateRecordSuccess
  | GetRecordsStart
  | GetRecordsSuccess
  | GetRecordStart
  | GetRecordSuccess
  | ClearRecords
  | ClearRecord
  | SetSorting;
