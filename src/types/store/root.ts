import IWorkspacesState from './workspaces';
import ICollectionsState from './collections';
import IRecordsState from './records';

export default interface IRootStore {
  workspaces: IWorkspacesState;
  collections: ICollectionsState;
  records: IRecordsState;
}
