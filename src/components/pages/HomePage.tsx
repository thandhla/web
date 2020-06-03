import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { getWorkspaces } from '../../actions/workspaces';
import { IWorkspaceModel } from '../../types/database';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';
import url from '../../utils/url';

const HomepPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaces());
  }, [dispatch]);

  const workspaces = useSelector((state: RootStore) => state.workspaces.workspaces);

  return (
    <div>
      <h1>Workspaces</h1>
      <div className="header-link"><Link to={routes.workspaces.create}>Create</Link></div>
      <ul>
        {workspaces.map((workspace: IWorkspaceModel) =>
          <li key={workspace.id}>
            <Link to={url(routes.workspaces.view, workspace)}>{workspace.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
};

export default HomepPage;
