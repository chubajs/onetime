import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route 
            path="/:componentName" 
            render={({ match }) => {
              const ComponentName = lazy(() => import(`./${match.params.componentName}`));
              return <ComponentName />;
            }} 
          />
          <Route exact path="/">
            <h1>Welcome to the Dynamic App Loader</h1>
            <p>Access components by adding their name to the URL.</p>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
