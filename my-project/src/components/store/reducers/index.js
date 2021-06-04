import { combineReducers } from 'redux';
import alert from "./alert"
import payment from "./payment"
import auth from "./auth"

export default combineReducers({
Alerts:alert,
Payments:payment,
Auth:auth,
});