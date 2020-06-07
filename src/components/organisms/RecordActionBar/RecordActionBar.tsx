import React from 'react';
import { useParams } from "react-router";
import Button from '../../atoms/Button/Button';
import RecordSorter from '../RecordSorter';
//import RecordFilter from '../../organisms/RecordFilter/Container';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../../types/store/root';
import { setSorting } from '../../../actions/records';

const RecordActionsBar = (props: any) => {
  const dispatch = useDispatch();
  const { viewId } = useParams();
  const { isSorting, sorts } = useSelector(({
    records: { isSorting, query: { sorts} }
  }: IRootStore) => ({ isSorting, sorts }));
  const style = {
    borderColor: 'black',
    fontWeight: 'bold'
  };

  // todo: use viewId for view switcher

  return (
    <div style={{ display: 'flex' }}>
      <div style={{
        margin: '0px 10px 10px 0px',
        padding: '2.5px 5px'
      }}>view: {viewId}</div>
      <div>
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
