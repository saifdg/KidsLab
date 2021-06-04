import { combineReducers } from 'redux';
import alert from "./alert"
import auth from "./auth"

export default combineReducers({
Alerts:alert,
Auth:auth,
});