import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from 'pages/Home';
import MapPage from 'pages/Map';

const Routess: React.FC = () => {
  return (
    <Switch>
      <Route exact component={HomePage} path="/" />

      <Route component={MapPage} path="/map" />

      <Redirect to="/" />
    </Switch>
  );
};

export default Routess;
