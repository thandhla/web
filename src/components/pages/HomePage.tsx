import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { getWorkspaces } from '../../actions/workspaces';

const HomepPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaces());
  }, []);

  const workspaces = useSelector((state: RootStore) => state.workspaces.workspaces);

  console.log({workspaces});

  return (
    <div>
      <h1>Workspaces</h1>
    </div>
  )
};

export default HomepPage;
