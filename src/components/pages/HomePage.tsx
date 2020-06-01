import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { getWorkspaces } from '../../actions/workspaces';
import { IWorkspaceModel } from '../../types/database/mainDB';
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workspaces.map((workspace: IWorkspaceModel) =>
            <tr key={workspace.id}>
              <td>
                <Link to={url(routes.workspaces.view, workspace)}>{workspace.name}</Link>
              </td>
              <td>
              <Link to={url(routes.workspaces.edit, workspace)}>Edit</Link> |
                Delete
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
};

export default HomepPage;
