import axios from 'axios';
import {USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './type';
import { setAlert } from './alert'
import setAuthToken from '../utlis/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


//login user

export const login = ({ email, password}) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log({ email, password})
    const body = { email, password };


    try {
        const res = await axios.post('/api/admin/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
}



//logout

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}