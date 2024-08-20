import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import ClickyTracker from './clickytracker';

// Add this line to import the Home component
const Home = lazy(() => import('./Home'));

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.clicky) {
      window.clicky.log(location.pathname + location.search, document.title);
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ClickyTracker />
      <PageViewTracker />
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