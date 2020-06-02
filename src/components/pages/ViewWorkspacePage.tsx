import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { getCollections, clearCollections } from '../../actions/collections';
import { Link, useParams } from 'react-router-dom';
import routes from '../../config/routes';

const ViewWorkspacePage: FC = () => {
  const dispatch = useDispatch();
  const { id: workspaceId } = useParams();

  useEffect(() => {
    dispatch(getWorkspace(workspaceId));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    dispatch(getCollections(workspaceId));
  },[dispatch, workspaceId]);

  useEffect(() => {
    return () => {
      dispatch(clearWorkspace());
      dispatch(clearCollections());
    }
  }, [dispatch]);

  const { workspace } = useSelector((state: RootStore) => state.workspaces);

  if (!workspace) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="header-link"><Link to={routes.home}>Workspaces</Link></div>
      <h1>Workspace: {workspace.name}</h1>
    </div>
  )
};

export default ViewWorkspacePage;
