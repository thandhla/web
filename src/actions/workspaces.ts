import { Dispatch } from 'redux';
import {
  IActionGetWorkspacesStart,
  IActionGetWorkspacesSuccess,
  WorkspaceActionTypes as types
} from '../types/store/workspaces';
import RootStore from '../types/store/root';

export const getWorkspaces = () => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const getWorkspacesStart: IActionGetWorkspacesStart = { type: types.GET_WORKSPACES_START }; 
    dispatch(getWorkspacesStart);
    
    const { ipcRenderer } = window.require("electron");
    const response = ipcRenderer.sendSync('nbql', {
      workspaces: {
        action: 'getWorkspaces'
      }
    });
    
    const getWorkspacesSuccess: IActionGetWorkspacesSuccess = {
      type: types.GET_WORKSPACES_SUCCESS,
      workspaces: response.data.workspaces 
    };
    dispatch(getWorkspacesSuccess);
  }
}
