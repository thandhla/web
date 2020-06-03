import IWorkspacesState from './workspaces';
import ICollectionsState from './collections';

export default interface IRootStore {
  workspaces: IWorkspacesState,
  collections: ICollectionsState
}
