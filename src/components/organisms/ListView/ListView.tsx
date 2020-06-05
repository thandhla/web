import React, { FC } from 'react';
import IRootStore from '../../../types/store/root';
import { ICollectionField } from '../../../types/database';
import { useSelector } from 'react-redux';

const TableView: FC = () => {
  const { collection, records } = useSelector(({
    collections: { collection},
    records: { records }
  }: IRootStore) => ({ collection, records }));
  
  
  if (!collection) {
    return <p>Loading....</p>
  }

  const { fields } = collection;

  const rowClicked = (row: string) => row;
  
  return (
    <table>
      <thead>
        <tr>
          {fields.map((field: ICollectionField, index: number) =>
            <th key={index}>
              {field.label}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {records.map((record) =>
          <tr key={record.id} onClick={() => rowClicked(record.id)}>
            {fields.map((field: ICollectionField, index: number) =>
              <td key={index}>
                {record.fields[field.id]}
              </td>
            )}
          </tr>
        )}
        <tr>
          <td
            colSpan={fields.length}
            onClick={() => createRecord(collection.id)}
          ><Button>New</Button></td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableView;
