import React, { FC } from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateWorkspacePage from './pages/CreateWorkspacePage';
import ViewWorkspacePage from './pages/ViewWorkspacePage';
import routes from '../config/routes';

const appRoutes = [
  {
    path: routes.home,
    exact: true,
    main: () => <HomePage />
  },
  {
    path: routes.workspaces.create,
    exact: true,
    main: () => <CreateWorkspacePage />
  },
  {
    path: routes.workspaces.view,
    exact: true,
    main: () => <ViewWorkspacePage />
  }
];

const Routes: FC = () => (
  <div className="content">
    <Switch>
      {appRoutes.map((route, index) =>
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      )}
    </Switch>
  </div>
);

export default Routes;
