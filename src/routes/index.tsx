import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import MapPage from '../pages/Map';

const Routess: React.FC = () => {
  return (
    <Switch>
      <Route component={MapPage} path="/map" />
    </Switch>
  );
};

export default Routess;
