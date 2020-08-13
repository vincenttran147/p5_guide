import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from './routeConfig.js';

export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route
            exact
            key={i}
            path={route.path}
            render={props => (
              <route.component {...props} />
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}
