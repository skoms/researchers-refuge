import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthenticatedUser } from './components/user/userAccManage/userAccSlice';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(selectAuthenticatedUser);
  return (
    <Route
      {...rest}
      render={ props => user // Rendering the Component if there's a user logged in, or redirects them to '/sign-in' if not
      ? 
        <Component {...props} /> 
      : 
        <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} /> // Saves the location, so that if signin is successful, user will be sent back to where they came from
      }
    />
  );
}