import React, { FC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './components/Routes';

const  App: FC = () => (
  <Router>
    <Switch>
      <Routes />
    </Switch>
  </Router>
);

export default App;
