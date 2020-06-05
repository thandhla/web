import { combineReducers } from 'redux';
import workspaces from '../reducers/workspaces';
//import workspaces, { initialState as workspacesState } from '../reducers/workspaces';
import collections from '../reducers/collections';
import records from '../reducers/records';

/*
export const initialState = {
  workspaces: workspacesState
};
*/

export default combineReducers({
  workspaces,
  collections,
  records
});
