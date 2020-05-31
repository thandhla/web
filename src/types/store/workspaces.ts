
export interface WorkspacesState {
  isFetching: boolean,
  isCreating: boolean,
  workspaces: any[],
}

export enum WorkspaceActionTypes {
  GET_WORKSPACES_START = 'GET_WORKSPACES_START',
  GET_WORKSPACES_SUCCESS = 'GET_WORKSPACES_SUCCESS'
}

export interface IActionGetWorkspacesStart {
  type: WorkspaceActionTypes.GET_WORKSPACES_START
}

export interface IActionGetWorkspacesSuccess {
  type: WorkspaceActionTypes.GET_WORKSPACES_SUCCESS;
  workspaces: any[];
}

export type WorkspacesActions =
  IActionGetWorkspacesStart |
  IActionGetWorkspacesSuccess;
