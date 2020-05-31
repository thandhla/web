import {
  WorkspacesState,
  WorkspacesActions,
  WorkspaceActionTypes as types
} from '../types/store/workspaces';

export const initialState = {
  isFetching: false,
  isCreating: false,
  workspaces: [],
};
  
export default (
  state = initialState, action: WorkspacesActions
): WorkspacesState => {
  switch (action.type) {
    case types.GET_WORKSPACES_START: {
      return {
        ...state,
        isFetching: true
      };
    }

    case types.GET_WORKSPACES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        workspaces: action.workspaces
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};