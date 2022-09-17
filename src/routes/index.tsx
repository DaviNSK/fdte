import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'pages/Home';
import MapPage from 'pages/Map';

const Routess: React.FC = () => {
  return (
    <Switch>
      <Route exact component={HomePage} path="/" />

      <Route component={MapPage} path="/map" />
    </Switch>
  );
};

export default Routess;
