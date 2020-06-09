import React from 'react';
import Button from '../../atoms/Button';
import Card from '../../atoms/Card';
import Sort from './Sort';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../../types/store/root';
import { getRecords } from '../../../actions/records';

const RecordSorter = () => {
  const dispatch = useDispatch();
  const { collection, query } = useSelector(({
    collections: { collection },
    records: { query }
  }: IRootStore) => ({ collection, query }));
  const { sorts } = query;

  if (!collection) {
    return <div>Loading...</div>
  }

  const fieldOptions = collection.fields.map((field: any) => {
    return { value: field.id, label: field.label };
  });
  const directionOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

  const addSort = () => {
    let updatedSorts = [ ...sorts ];
    updatedSorts.push({
      field: collection.fields[0].id,
      direction: 'asc'
    });
    
    updateRecords(updatedSorts);
  }

  const updateSorts = (index: number, data: any) => {
    let updatedSorts = [ ...sorts ];
    updatedSorts[index] = data;

    updateRecords(updatedSorts);
  }

  const deleteSort = (index: number) => {
    let updatedSorts = [ ...sorts ];
    updatedSorts.splice(index, 1);

    updateRecords(updatedSorts);
  }
  
  const updateRecords = (updatedSorts: any) => {
    dispatch(getRecords({ ...query, sorts: updatedSorts }));
  }

  return (
    <div className="record-sorts">
      <Card
        header={() => <div>Sort</div>}
       >
        {query.sorts.map((sort: any, index: number) =>
          <Sort
            key={index}
            {...{
              index,
              sort,
              fieldOptions,
              directionOptions,
              updateSorts,
              deleteSort,
            }}
          />
        )}
        <Button onClick={addSort}>Add a sort</Button>
      </Card>
    </div>
  )
}

export default RecordSorter;
