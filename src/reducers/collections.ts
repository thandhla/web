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
        isCreating: false,
        collection: action.collection
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
        isFetchingList: false,
        collections: action.collections
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
        isFetchingOne: false,
        collection: action.collection
      };
    }

    case types.CLEAR_COLLECTIONS: {
      return {
        ...state,
        collections: []
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};