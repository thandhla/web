import React, { FC, useEffect } from 'react';
import IRootStore from '../../../types/store/root';
import { useSelector, useDispatch } from 'react-redux';
import { getRecord } from '../../../actions/records';

interface CIRecordForm {
  record: string;
}

const RecordForm: FC<CIRecordForm> = ({ record: recordId }) => {
  const dispatch = useDispatch();
  const record = useSelector(({
    records: { record }
  }: IRootStore) => record);
  
  useEffect(() => {
    dispatch(getRecord(recordId));
  }, [dispatch, recordId]);

  if (!record) {
    return <div>Loading RecordForm....</div>
  }
  
  return (
    <div>RecordForm: {record.id}</div>
  )
};

export default RecordForm;