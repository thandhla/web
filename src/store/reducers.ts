import { combineReducers } from 'redux';
import workspaces, { initialState as workspacesState } from '../reducers/workspaces';

export const initialState = {
  workspaces: workspacesState,
};

export default combineReducers({
  workspaces,
});