import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { appRoutes } from './config/routes';

const  App: FC = () => (
  <Router>
    <Switch>
      {appRoutes.map((route, index) =>
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={route.main}
        />
      )}
    </Switch>
  </Router>
);

export default App;
  