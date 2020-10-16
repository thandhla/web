import React, { FC, useEffect, useState } from 'react';
import IRootStore from '../../../types/store/root';
import { useSelector, useDispatch } from 'react-redux';
import { getRecord, clearRecord, updateRecord, deleteRecord, setRecordSynced } from '../../../actions/records';
import Card from '../../atoms/Card';
import recordTemplate from '../../../utils/recordTemplate';
import RecordField from './RecordField';
import { IRecordModel } from '../../../types/database';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../atoms/Button';

interface CIRecordForm {
  recordId: string;
}

const RecordForm: FC<CIRecordForm> = ({ recordId }) => {
  const dispatch = useDispatch();
  const { collection, record: initialRecord, recordSynced } = useSelector(({
    collections: { collection },
    records: { record, recordSynced, }
  }: IRootStore) => ({ collection, record, recordSynced, }));
  const emptyRecord: IRecordModel = {
    id: '',
    collectionId: '',
    fields: {},
    createdAt: "",
    updatedAt: ""
  };
  const history = useHistory();
  const [recordFetched, setRecordFetched] = useState(false);
  const [record, editRecord] = useState(emptyRecord);
  const [cleanRecord, setCleanRecord] = useState(emptyRecord);
  const [recordSubmitted, setRecordSubmitted] = useState(false);
  const formIsDirty = JSON.stringify(cleanRecord.fields) !== JSON.stringify(record.fields);
  
  useEffect(() => {
    if (!recordFetched) {
      // fetch record data
      dispatch(getRecord(recordId));
      setRecordFetched(true);
    }

    if (collection && recordFetched && initialRecord) {
      // initialise local state
      const formRecord = recordTemplate(collection.fields, initialRecord)
      setCleanRecord(formRecord);
      editRecord(formRecord);
    }
  }, [dispatch, recordId, initialRecord, recordFetched, collection]);

  // record submitted sucessfullt
  useEffect(() => {
    if (!recordSynced && recordSubmitted) {
      setRecordSynced(true);
      history.push({ search: '' });
    }
  }, [history, recordSynced, recordSubmitted]);

  const handleCancelButtonClick = () => {
    dispatch(clearRecord());
    history.push({ search: '' });
  }

  const handleDeleteButtonClick = () => {
    setRecordSubmitted(true);
    dispatch(deleteRecord(record.id));
  }

  const updateField = (fieldId: string, value: any) => {
    const fields = { ...record.fields, [fieldId]: value };
    const updatedRecord = { ...record, fields };

    editRecord(updatedRecord);
  }

  const submitRecord = () => {
    setRecordSubmitted(true);
    dispatch(updateRecord(record));
  }

  if (!collection || !initialRecord) {
    return (
      <Card
        containerStyle={{
          width: '80%',
          height: '75%',
        }}
      >
        <div className="buttons" style={{ marginTop: '20px' }}>
          <button
            className="btn"
            style={{ marginRight: "10px" }}
            onClick={handleCancelButtonClick}
          >Cancel</button>
        </div>
        <div>Loading RecordForm...</div>
      </Card>
    )
  }
  
  return (
    <Card
      containerStyle={{
        width: '80%',
        height: '75%',
      }}
    >
      <div className="buttons" style={{ marginTop: '20px' }}>
        <Button
          className="btn"
          style={{ marginRight: "10px" }}
          onClick={handleCancelButtonClick}
        >Cancel</Button>
        <Button
          className="btn"
          style={{ marginRight: "10px" }}
          onClick={handleDeleteButtonClick}
        >Delete</Button>
        {formIsDirty &&
          <>
            <Button
              className="btn"
              style={{ marginRight: "10px" }}
              onClick={() => editRecord(cleanRecord)}
            >Undo changes</Button>
            <Button
              className="btn btn-primary"
              onClick={submitRecord}
            >Update</Button>
          </>
        }
      </div>
      <p style={{ color: '#555' }}>{`Record ID: ${record.id}`}</p>
      {collection.fields.map((collectionField) =>
        <RecordField
          key={collectionField.id}
          field={collectionField}
          record={record}
          update={(value: any) => updateField(collectionField.id, value)}
        />
      )}
    </Card>
  )
};

const RecordFormWrapper: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const recordId = searchParams.get('r');

  if (!recordId) {
    return <></>
  }

  return <RecordForm recordId={recordId} />
}

export default RecordFormWrapper;