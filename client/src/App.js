// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Login, Dashboard} from './pages';
import NotFoundPage from "./pages/NotFoundPage";

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { history } from "./utils/history";

function App() {
  return (
    <div className="App">

      <Router history={history} >
          <div className="content-wrapper">
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/" exact component={Login} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route component={NotFoundPage}/>
            </Switch>
          </div>
      </Router>

      
    </div>
  );
}

export default App;
