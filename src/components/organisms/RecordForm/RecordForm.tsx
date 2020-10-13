import React, { FC, useEffect, useState } from 'react';
import IRootStore from '../../../types/store/root';
import { useSelector, useDispatch } from 'react-redux';
import { getRecord, clearRecord, updateRecord } from '../../../actions/records';
import Card from '../../atoms/Card';
import recordTemplate from '../../../utils/recordTemplate';
import RecordField from './RecordField';
import { IRecordModel } from '../../../types/database';
import { useHistory, useLocation } from 'react-router-dom';

interface CIRecordForm {
  recordId: string;
}

const RecordForm: FC<CIRecordForm> = ({ recordId }) => {
  const dispatch = useDispatch();
  const { collection, record: rawRecord, isSynced, isNew } = useSelector(({
    collections: { collection },
    records: { record, isSynced, isNew }
  }: IRootStore) => ({ collection, record, isSynced, isNew }));
  const emptyRecord: IRecordModel = {
    id: '',
    collectionId: '',
    fields: {}
  };
  const history = useHistory();
  const [recordFetched, setRecordFetched] = useState(false);
  const [record, editRecord] = useState(emptyRecord);
  const [cleanRecord, setCleanRecord] = useState(emptyRecord);
  
  useEffect(() => {
    if (!recordFetched) {
      dispatch(getRecord(recordId));
      setRecordFetched(true);
    }

    if (collection && recordFetched) {
      const formRecord = recordTemplate(collection.fields, rawRecord)
      setCleanRecord(formRecord);
      editRecord(formRecord);
    }
  }, [dispatch, recordId, rawRecord, recordFetched, collection]);

  useEffect(() => {
    if (!isSynced) {
      history.push({ search: '' });
    }
  }, [isSynced, history]);

  if (!collection || !rawRecord) {
    return <div>Loading RecordForm....</div>
  }

  const formIsDirty = JSON.stringify(cleanRecord.fields) !== JSON.stringify(record.fields);

  const cancelEditing = () => {
    dispatch(clearRecord());
    history.push({ search: '' });
  }

  const updateField = (fieldId: string, value: any) => {
    const fields = { ...record.fields, [fieldId]: value };
    const updatedRecord = { ...record, fields };

    editRecord(updatedRecord);
  }

  const submitRecord = () => {
    dispatch(updateRecord(record));
  }
  
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
          onClick={() => cancelEditing()}
        >Cancel</button>
        {isNew ?
          <>
            <button
              className="btn btn-primary"
              onClick={submitRecord}
            >Add</button>
          </>
          :
          <>
            {formIsDirty &&
              <>
                <button
                  className="btn"
                  style={{ marginRight: "10px" }}
                  onClick={() => editRecord(cleanRecord)}
                >Undo changes</button>
                <button
                  className="btn btn-primary"
                  onClick={submitRecord}
                >Update</button>
              </>
            }
          </>
        }
      </div>
      <p style={{ color: '#555' }}>{`Record ID: ${record.id}`}</p>
      {collection.fields.map((collectionField) =>
        <RecordField
          key={collectionField.id}
          field={collectionField}
          data={record.fields[collectionField.id]}
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