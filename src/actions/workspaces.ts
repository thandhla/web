import { Dispatch } from 'redux';
import {
  IWorkspaceActionTypes as types,
  CreateWorkspaceStart,
  CreateWorkspaceSuccess,
  GetWorkspacesStart,
  GetWorkspacesSuccess,
  GetWorkspaceStart,
  GetWorkspaceSuccess,
} from '../types/store/workspaces';
import RootStore from '../types/store/root';
import { queries } from '@testing-library/react';

const { ipcRenderer } = window.require("electron");

export const createWorkspace = (name: string) => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const createWorkspaceStart: CreateWorkspaceStart = {
      type: types.CREATE_WORKSPACE_START
    };
    
    dispatch(createWorkspaceStart);

    const queries = {
      workspace: {
        action: 'createWorkspace',
        args: { name }
      }
    };
    const response = ipcRenderer.sendSync('nbql', [null, queries]);
    const createWorkspaceSuccess: CreateWorkspaceSuccess = {
      type: types.CREATE_WORKSPACE_SUCCESS,
      workspace: response.data.workspace 
    };
    
    dispatch(createWorkspaceSuccess);
  }
}

export const getWorkspaces = () => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const getWorkspacesStart: GetWorkspacesStart = {
      type: types.GET_WORKSPACES_START
    };
    
    dispatch(getWorkspacesStart);
    
    const queries = {
      workspaces: {
        action: 'getWorkspaces'
      }
    };
    const response = ipcRenderer.sendSync('nbql', [null, queries]);
    const getWorkspacesSuccess: GetWorkspacesSuccess = {
      type: types.GET_WORKSPACES_SUCCESS,
      workspaces: response.data.workspaces 
    };
    
    dispatch(getWorkspacesSuccess);
  }
}

export const getWorkspace = (id: string) => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const getWorkspaceStart: GetWorkspaceStart = {
      type: types.GET_WORKSPACE_START
    };
    
    dispatch(getWorkspaceStart);
    
    const queries = {
      workspace: {
        action: 'getWorkspace',
        args: { id }
      }
    };
    const response = ipcRenderer.sendSync('nbql', [null, queries]);
    const getWorkspaceSuccess: GetWorkspaceSuccess = {
      type: types.GET_WORKSPACE_SUCCESS,
      workspace: response.data.workspace
    };
    
    dispatch(getWorkspaceSuccess);
  }
}
