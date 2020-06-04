import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { getCollection, clearCollection } from '../../actions/collections';
import { Link, useParams } from 'react-router-dom';
import routes from '../../config/routes';
import url from '../../utils/url';

const ReadCollectionPage: FC = () => {
  const dispatch = useDispatch();
  const { workspaceId, collectionId } = useParams();
  const { workspace, collection } = useSelector(({
    workspaces: { workspace },
    collections: { collection }
  }: RootStore) => ({ workspace, collection }));

  useEffect(() => {
    if (!workspace) {
      dispatch(getWorkspace(workspaceId));
    }
    if (workspace && !collection) {
      dispatch(getCollection(collectionId));
    }
  }, [dispatch, workspace, workspaceId, collection, collectionId]);

  useEffect(() => {
    return () => {
      dispatch(clearWorkspace());
      dispatch(clearCollection());
    }
  }, [dispatch]);
  
  if (!workspace || !collection) {
    return <div>Loading ReadCollectionPage...</div>
  }

  return (
    <div>
      <div className="header-link">
        <Link to={routes.home}>Workspaces</Link> >
        <Link to={url(routes.workspaces.read, { workspaceId: workspace.id })}>{workspace.name}</Link>
      </div>
      <h1>{collection.name}</h1>
      {/*
      <div className="header-link"><Link to={url(routes.collections.add, { workspaceId: workspace.id })}>Create</Link></div>
      
      <ul>
        {collections.map((collection: ICollectionModel) =>
          <li key={collection.id}>
            <Link to={url(routes.collections.read, { collectionId: collection })}>{collection.name}</Link>
          </li>
        )}
      </ul>
      */}
    </div>
  )
};

export default ReadCollectionPage;
