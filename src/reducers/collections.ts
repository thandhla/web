import ICollectionsState, {
  ICollectionsAction,
  ICollectionActionTypes as types
} from '../types/store/collections';

export const initialState: ICollectionsState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  collections: [],
  collection: null,
};
  
export default (
  state = initialState, action: ICollectionsAction
): ICollectionsState => {
  switch (action.type) {
    case types.CREATE_COLLECTION_START: {
      return {
        ...state,
        isCreating: true
      };
    }
    case types.CREATE_COLLECTION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false
      };
    }

    case types.GET_COLLECTIONS_START: {
      return {
        ...state,
        isFetchingList: true
      };
    }
    case types.GET_COLLECTIONS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingList: false,
      };
    }

    case types.GET_COLLECTION_START: {
      return {
        ...state,
        isFetchingOne: true
      };
    }
    case types.GET_COLLECTION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingOne: false
      };
    }

    case types.CLEAR_COLLECTIONS: {
      return {
        ...state,
        collections: []
      };
    }

    case types.CLEAR_COLLECTION: {
      return {
        ...state,
        collection: null
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};