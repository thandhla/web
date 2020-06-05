import IRecordsState, {
  IRecordsAction,
  IRecordActionTypes as types
} from '../types/store/records';

export const initialState: IRecordsState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  records: [],
  record: null,
  query: {
    collection: '',
    sorts: [],
  }
};
  
export default (
  state = initialState, action: IRecordsAction
): IRecordsState => {
  switch (action.type) {
    case types.CREATE_RECORD_START: {
      return {
        ...state,
        isCreating: true
      };
    }
    case types.CREATE_RECORD_SUCCESS: {
      return {
        ...state,
        isCreating: false,
        record: action.record
      };
    }

    case types.GET_RECORDS_START: {
      return {
        ...state,
        isFetchingList: true
      };
    }
    case types.GET_RECORDS_SUCCESS: {
      return {
        ...state,
        isFetchingList: false,
        records: action.records
      };
    }

    case types.GET_RECORD_START: {
      return {
        ...state,
        isFetchingOne: true
      };
    }
    case types.GET_RECORD_SUCCESS: {
      return {
        ...state,
        isFetchingOne: false,
        record: action.record
      };
    }

    case types.CLEAR_RECORDS: {
      return {
        ...state,
        records: []
      };
    }

    case types.CLEAR_RECORD: {
      return {
        ...state,
        record: null
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};