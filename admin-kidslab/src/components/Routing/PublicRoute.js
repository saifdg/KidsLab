import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect}from 'react-redux'
import PropTypes from 'prop-types';

function PublicRoute({ component ,auth:{isAuthenticated}, ...rest}) {
    return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              <Redirect
                to={{
                  pathname: "/app",
                }}
              />
            ) : (
              React.createElement(component, props)
            )
          }
        />
      );
  }
  PublicRoute.propTypes= {
    auth:PropTypes.object.isRequired,
  }
  const mapStateProps = state => ({
    auth: state.Auth
  });
  

  export default connect(mapStateProps)(PublicRoute)