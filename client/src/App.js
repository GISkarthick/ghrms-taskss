// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Login, Dashboard} from './pages';
import NotFoundPage from "./pages/NotFoundPage";

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { history } from "./utils/history";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
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
