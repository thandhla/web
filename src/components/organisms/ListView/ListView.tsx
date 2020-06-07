import React, { FC } from 'react';
import IRootStore from '../../../types/store/root';
import { ICollectionField, IViewModel } from '../../../types/database';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface IListView {
  view: IViewModel;
  newRecord: any;
}

const ListView: FC<IListView> = ({ view, newRecord }) => {
  const history = useHistory();
  const { collection, records } = useSelector(({
    collections: { collection},
    records: { records }
  }: IRootStore) => ({ collection, records }));
  
  if (!collection) {
    return <p>Loading....</p>
  }

  const { fields: clFields } = collection;
  const fields: ICollectionField[] = [];
  
  for (const viewField of view.fields) {
    const field = clFields.find((clField: ICollectionField) => clField.id === viewField);

    if (field) {
      fields.push(field);
    }
  }

  const rowClicked = (recordId: string) => history.push({ search: `?r=${recordId}` });
  
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
          <td colSpan={fields.length}>
            <button
              onClick={newRecord}
            >New</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ListView;
