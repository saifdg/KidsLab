import React from 'react'
import PropTypes from 'prop-types'
import {Route , Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({
    component:Component ,
     auth:{isAuthenticated , loading},
     ...rest})=>(
     <Route {...rest} 
       render={props => !isAuthenticated&& !loading?(
           <Redirect to='/'/>
       ):(
           <Component {...props} />
       )
    }  
    />); 

PrivateRoute.propTypes = {
auth:PropTypes.object.isRequired,
}

const mapStateProps=state=>({
    auth:state.Auth
  });

export default connect(mapStateProps)(PrivateRoute)
