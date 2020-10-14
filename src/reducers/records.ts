import IRecordsState, {
  IRecordsAction,
  IRecordActionTypes as types
} from '../types/store/records';

export const initialState: IRecordsState = {
  isFetchingOne: false,
  isFetchingList: false,
  isFetchingTempRecords: false,
  isCreating: false,
  isUpdating: false,
  isSynced: true,
  isNew: false,
  isSorting: false,
  records: [],
  tempRecords: [],
  record: null,
  relatedToRecords: [],
  relatedToRecord: [],
  query: {
    collectionId: '',
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
        isFetchingList: false,
        isSynced: true
      };
    }

    case types.GET_TEMP_RECORDS_START: {
      return {
        ...state,
        isFetchingTempRecords: true
      };
    }
    case types.GET_TEMP_RECORDS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingTempRecords: false
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
        ...action.payload,
        isFetchingOne: false,
        isNew: false
      };
    }

    case types.UPDATE_RECORD_START: {
      return {
        ...state,
        isUpdating: true
      };
    }
    case types.UPDATE_RECORD_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        isSynced: false
      };
    }

    case types.CLEAR_RECORDS: {
      return {
        ...state,
        records: [],
        relatedToRecords: [],
      };
    }

    case types.CLEAR_TEMP_RECORDS: {
      return {
        ...state,
        tempRecords: []
      };
    }
    
    case types.CLEAR_RECORD: {
      return {
        ...state,
        record: null,
        relatedToRecord: [],
        isNew: false
      };
    }

    case types.SET_SORTING: {
      return {
        ...state,
        ...action.payload
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};