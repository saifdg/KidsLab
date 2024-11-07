import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect}from 'react-redux'
import PropTypes from 'prop-types';

function PrivateRoute({ component,auth:{isAuthenticated}, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }
  PrivateRoute.propTypes= {
    auth:PropTypes.object.isRequired,
  }
  const mapStateProps = state => ({
    auth: state.Auth
  });
  

  export default connect(mapStateProps)(PrivateRoute)