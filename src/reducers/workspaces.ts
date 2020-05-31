import {
  WorkspacesState,
  WorkspacesActions,
  WorkspaceActionTypes as types
} from '../types/store/workspaces';

export const initialState = {
  isLoading: false,
  collections: [],
  relatedCollections: [],
  collection: null,
  created: null,
};
  
export default (
  state = initialState, action: WorkspacesActions
): WorkspacesState => {
  switch (action.type) {
    case types.GET_COLLECTIONS_START: {
      return {
        ...state,
        isLoading: true
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};