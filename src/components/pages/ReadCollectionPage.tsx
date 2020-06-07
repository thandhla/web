import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../types/store/root';
import { IViewModel, IViewTypes } from '../../types/database';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { getCollection, clearCollection } from '../../actions/collections';
import { getRecords, createRecord, clearRecords, clearRecord } from '../../actions/records';
import routes from '../../config/routes';
import url from '../../utils/url';
import { Link, useParams, Redirect, useLocation, useHistory } from 'react-router-dom';
import ListView from '../organisms/ListView';
import RecordForm from '../organisms/RecordForm';

const ReadCollectionPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const recordSearchParam = searchParams.get('r');
  const { collectionId, viewId } = useParams();
  const [collectionFetched, setCollectionFetched] = useState(false);
  const [recordsFetched, setRecordsFetched] = useState(false);
  const { workspace, collection, records, record, isCreating, isNew } = useSelector(({
    workspaces: { workspace },
    collections: { collection },
    records: { records, record, isCreating, isNew }
  }: IRootStore) => ({ workspace, collection, records, record, isCreating, isNew }));
  
  useEffect(() => {
    if (!collectionFetched) {
      setCollectionFetched(true);
      dispatch(getCollection(collectionId));
    }

    if (collection && !workspace) {
      dispatch(getWorkspace(collection.workspaceId));
    }

    if (collection && !recordsFetched) {
      setRecordsFetched(true);
      dispatch(getRecords({
        collection: collection.id,
        sorts: []
      }));
    }
  }, [
    dispatch,
    history,
    location,
    recordSearchParam,
    collectionId,
    collectionFetched,
    recordsFetched,
    workspace,
    collection,
    records,
    record,
    isCreating,
    isNew
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearWorkspace());
      dispatch(clearCollection());
      dispatch(clearRecords());
      dispatch(clearRecord());
    }
  }, [dispatch]);
  
  if (!workspace || !collection) {
    return <div>Loading ReadCollectionPage....</div>
  }

  const view = collection.views.find((view: IViewModel) => view.id === viewId);

  if (!view) {
    return <Redirect to={url(routes.collections.read, {
      collectionId: collection.id,
      viewId: collection.defaultView
    })} />
  }

  const newRecord = () => {
    dispatch(createRecord(workspace.id, collection.id));
  };

  const selectedView = (type: IViewTypes) => {
    const viewProps = { view , newRecord };
    switch (type) {
      case IViewTypes.list: {
        return <ListView { ...viewProps } />
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
      {recordSearchParam &&
        <RecordForm record={recordSearchParam} />
      }
    </div>
  )
};

export default ReadCollectionPage;
