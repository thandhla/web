import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../types/store/root';
import { IViewModel, IViewTypes } from '../../types/database';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { getCollection, clearCollection } from '../../actions/collections';
import { getRecords } from '../../actions/records';
import routes from '../../config/routes';
import url from '../../utils/url';
import { Link, useParams, Redirect } from 'react-router-dom';
import ListView from '../organisms/ListView';

const BrowseRecordsPage: FC = () => {
  const dispatch = useDispatch();
  const { workspaceId, collectionId, viewId } = useParams();
  const [collectionFetched, setCollectionFetched] = useState(false);
  const [recordsFetched, setRecordsFetched] = useState(false);
  const { workspace, collection, records } = useSelector(({
    workspaces: { workspace },
    collections: { collection },
    records: { records }
  }: IRootStore) => ({ workspace, collection, records }));

  useEffect(() => {
    if (!workspace) {
      dispatch(getWorkspace(workspaceId));
    }
    if (workspace && !collectionFetched) {
      setCollectionFetched(true);
      dispatch(getCollection({
        workspace: workspace.id,
        collection: collectionId
      }));
    }
    if (workspace && collection && !recordsFetched) {
      setRecordsFetched(true);
      dispatch(getRecords(workspace.id, {
        collection: collection.id,
        sorts: []
      }));
    }
  }, [
    dispatch,
    workspaceId,
    collectionId,
    collectionFetched,
    recordsFetched,
    workspace,
    collection,
    records
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearWorkspace());
      dispatch(clearCollection());
    }
  }, [dispatch]);
  
  if (!workspace || !collection) {
    return <div>Loading BrowseRecordsPage....</div>
  }

  const view = collection.views.find((view: IViewModel) => view.id === viewId);

  if (!view) {
    return <Redirect to={url(routes.records.browse, {
      workspaceId: workspace.id,
      collectionId: collection.id,
      viewId: collection.defaultView
    })} />
  }

  const selectedView = (type: IViewTypes) => {
    switch (type) {
      case IViewTypes.list: {
        return <ListView />
      }
      
      default: {
        return <p style={{ color: 'red' }}>Unknown view type: {type}</p>
      }
    }
  }

  return (
    <div>
      <div className="header-link">
        <Link to={routes.home}>Workspaces</Link> >
        <Link to={url(routes.workspaces.read, { workspaceId: workspace.id })}>{workspace.name}</Link>
      </div>
      <h1>{collection.name}</h1>
      {view ?
        selectedView(view.type)
        :
        <p>Loading...</p>
      }
      
    </div>
  )
};

export default BrowseRecordsPage;
