import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClickyTracker from './clickytracker';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <ClickyTracker />
      <Suspense fallback={<div>Загрузка...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route 
            path="/:componentName" 
            render={({ match }) => {
              const ComponentName = lazy(() => import(`./${match.params.componentName}`));
              return <ComponentName />;
            }} 
          />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;