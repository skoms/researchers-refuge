import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { Context } from './Context';

export default function PrivateRoute({ component: Component, ...rest }) {
  const context = useContext(Context);
  const user = context.authenticatedUser;
  return (
    <Route
      {...rest}
      render={ props => user // Rendering the Component if there's a user logged in, or redirects them to '/signin' if not
      ? 
        <Component {...props} /> 
      : 
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} /> // Saves the location, so that if signin is successful, user will be sent back to where they came from
      }
    />
  );
}