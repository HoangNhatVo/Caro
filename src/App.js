import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './route';

function App() {
  function showcontentMenu(route) {
    let result = null;
    if (route.length > 0) {
      result = route.map((r, index) => {
        return (
          <Route key={index} path={r.path} exact={r.exact} component={r.main} />
        );
      });
    }
    return result;
  }
  return (
    <Router>
      <div className="App">
        <Switch>{showcontentMenu(routes)}</Switch>
      </div>
    </Router>
  );
}

export default App;
