import { Dispatch } from 'redux';
import { WorkspaceActionTypes as types } from '../types/store/workspaces';
import RootStore from '../types/store/root';

export const getWorkspaces = () => {
  return (dispatch: Dispatch, getState: RootStore) => {
    dispatch({type: types.GET_COLLECTIONS_START });
  }
}
