import { combineReducers } from 'redux';
import alert from "./alert"
import payment from "./payment"
import auth from "./auth"
import postReducer from './postReducer';

export default combineReducers({
Alerts:alert,
Payments:payment,
Auth:auth,
post:postReducer,

});