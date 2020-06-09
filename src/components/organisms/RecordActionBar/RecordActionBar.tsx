import React, { FC } from 'react';
import Button from '../../atoms/Button/Button';
import RecordSorter from '../../molecules/RecordSorter';
import RecordGroupDropdown from '../../molecules/RecordGroupDropdown';
//import RecordFilter from '../../organisms/RecordFilter/Container';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../../types/store/root';
import { setSorting } from '../../../actions/records';

const RecordActionsBar: FC = () => {
  const dispatch = useDispatch();
  const { view, isSorting, sorts } = useSelector(({
    views: { view },
    records: { isSorting, query: { sorts} }
  }: IRootStore) => ({ view, isSorting, sorts }));
  const style = {
    borderColor: 'black',
    fontWeight: 'bold'
  };

  if (!view) {
    return <div>Loading RecordActionsBar....</div>
  }

  const groupable = ['list'];

  return (
    <div className="action-bar" style={{ display: 'flex' }}>
      <div style={{
        margin: '0px 10px 10px 0px',
        padding: '2.5px 5px'
      }}>
        view: {view.id}
      </div>
      {groupable.includes(view.type) &&
        <RecordGroupDropdown />
      }
      <div className="record-sorts">
        <Button
          style={sorts.length > 0 ? style : {}}
          onClick={() => dispatch(setSorting(!isSorting))}
        >Sort</Button>
        {isSorting &&
          <RecordSorter />
        }
      </div>
    </div>
  )
}

export default RecordActionsBar;
