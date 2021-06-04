import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import { setAlert } from './alert'
import setAuthToken from '../components/utils/setAuthToken';
import { useSelector } from "react-redux";

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


//register user

export const register = ({ firstName, lastName, email, gender, password, file, sub }) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = { firstName, lastName, email, gender, password, file, sub }

    try {

        const res = await axios.post('/api/users', body, config);


        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}


//login user

export const login = ({ email, password, stayloged }) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = { email, password };


    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
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



// update user

export const UpdateUser = ({ firstName, lastName, file ,id}) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { firstName, lastName, file };


    try {
        const res = await axios.put(`/api/users/updatedetails/${id}`, body, config);
        console.log(id)
     

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//update Password


export const UpdatePassword = ({ newPassword, currentPassword }) => async dispatch => {  
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = { newPassword, currentPassword };


    try {
        const res = await axios.put(`/api/users/updatepassword`, body, config);

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}