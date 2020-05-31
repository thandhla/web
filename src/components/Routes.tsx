import React, { FC } from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage';

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />
  }
];

const Routes: FC = () => (
  <div className="content">
    <Switch>
      {routes.map((route, index) =>
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
