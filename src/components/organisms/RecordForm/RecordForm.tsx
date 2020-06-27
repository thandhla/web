import React, { FC, useEffect, useState } from 'react';
import IRootStore from '../../../types/store/root';
import { useSelector, useDispatch } from 'react-redux';
import { getRecord, clearRecord, updateRecord } from '../../../actions/records';
import Card from '../../atoms/Card';
import recordTemplate from '../../../utils/recordTemplate';
import RecordField from './RecordField';
import { IRecordModel } from '../../../types/database';
import { useHistory } from 'react-router-dom';

interface CIRecordForm {
  record: string;
}

const RecordForm: FC<CIRecordForm> = ({ record: recordId }) => {
  const dispatch = useDispatch();
  const { collection, record: initialRecord, isNew } = useSelector(({
    collections: { collection },
    records: { record, isNew }
  }: IRootStore) => ({ collection, record, isNew }));
  const emptyRecord: IRecordModel = {
    id: '',
    collectionId: '',
    fields: {}
  };
  const history = useHistory();
  const [recordFetched, setRecordFetched] = useState(false);
  const [record, editRecord] = useState(emptyRecord);
  
  useEffect(() => {
    if (!recordFetched) {
      dispatch(getRecord(recordId));
      setRecordFetched(true);
    }

    if (collection && recordFetched) {
      editRecord(recordTemplate(collection.fields, initialRecord));
    }
  }, [dispatch, recordId, initialRecord, recordFetched, collection]);

  if (!collection || !initialRecord) {
    return <div>Loading RecordForm....</div>
  }

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
    //todo: clear record and redirect back to collection if changes we're sucessfull 
    //dispatch(updateRecord(record));
  };
  
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
        {/* todo: use singular for add button update button */}
        <button
          className="btn btn-primary"
          onClick={submitRecord}
        >{isNew ? 'Add ' + collection.name : 'Update' + collection.name}</button>
      </div>
      <p style={{ color: '#555' }}>{`Record ID: ${record.id}`}</p>
      {collection.fields.map((collectionField) =>
        <RecordField
          key={collectionField.id}
          field={collectionField}
          data={record.fields[collectionField.id]}
          update={updateField}
        />
      )}
    </Card>
  )
};

export default RecordForm;