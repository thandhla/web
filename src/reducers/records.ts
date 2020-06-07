import IRecordsState, {
  IRecordsAction,
  IRecordActionTypes as types
} from '../types/store/records';

export const initialState: IRecordsState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  isNew: false,
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
        ...action.payload,
        isCreating: false,
        isNew: true
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
        ...action.payload,
        isFetchingList: false
      };
    }

    case types.GET_RECORD_START: {
      return {
        ...state,
        isFetchingOne: true
      };
    }
    case types.GET_RECORD_SUCCESS: {
      console.log('get record')
      return {
        ...state,
        ...action.payload,
        isFetchingOne: false,
        isNew: false
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
        record: null,
        isNew: false
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};