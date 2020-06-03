import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { ICollectionModel } from '../../types/database';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { getCollections, clearCollections } from '../../actions/collections';
import { Link, useParams } from 'react-router-dom';
import routes from '../../config/routes';
import url from '../../utils/url';
import collections from '../../reducers/collections';

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

  const workspace = useSelector((store: RootStore) => store.workspaces.workspace);
  const { collections } = useSelector((store: RootStore) => store.collections);
  
  if (!workspace) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="header-link"><Link to={routes.home}>Workspaces</Link></div>
      <h1>Workspace: {workspace.name}</h1>
      <h3>Collections</h3>
      <div className="header-link"><Link to={url(routes.collections.create, { workspaceId: workspace.id })}>Create</Link></div>
      <ul>
        {collections.map((collection: ICollectionModel) =>
          <li key={collection.id}>
            <Link to={url(routes.collections.view, collection)}>{collection.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
};

export default ViewWorkspacePage;
