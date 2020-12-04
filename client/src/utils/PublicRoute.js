
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !localStorage.getItem('token') ? <Component {...props} /> : <Redirect to={{ pathname: '/cart1' }} />}
    />
  )
}

export default PublicRoute;