import React from 'react'
import PropTypes from 'prop-types'
import {connect}from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";

const Alert = ({alerts})=> alerts !==null && alerts.length > 0 && alerts.map(alert=>(   
    <div key={alert.id} className={`alert alert-${alert.alertType}`} style={{width:"100%",textAlign:"center",fontSize:"16px"}}>
        {alert.msg}
    </div>
    )
)

Alert.propTypes = {
    alerts:PropTypes.array.isRequired,
}
const mapStateProps = state =>({
    alerts:state.Alerts
});

export default connect(mapStateProps)(Alert);