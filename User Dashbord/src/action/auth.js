import axios from 'axios';
import { GET_STATS,REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import { setAlert } from './alert'
import setAuthToken from '../components/utils/setAuthToken';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';

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

export const register = (Form) => async dispatch => {
   
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.post('/api/users', Form, config);
        /*  dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
          });*/
        dispatch(setAlert(res.data.msg, 'success'))
        dispatch(loadUser());
        setTimeout(()=>{window.location.replace("http://localhost:3000/")}, 3000)
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


//register formateur

export const registerFormateur = (Form) => async dispatch => {
   
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.post('/api/admin/formateur', Form);
        /*  dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
          });*/
        dispatch(setAlert(res.data.msg, 'success'))
        dispatch(loadUser());
        setTimeout(()=>{window.location.replace("http://localhost:3000/")}, 3000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

//Get stats

export const Stats = () => async dispatch => {

    const res2=  await axios.get('/api/users/jeuxtraiter/jeux')
    dispatch({
        type: GET_STATS,
        payload: res2.data
    })
     dispatch(loadUser())

}

/*export const CreeDb = () => async dispatch => {

    const res2=  await axios.get('/api/users/creeDb')
    dispatch({
        type: GET_STATS,
        payload: res2.data
    })
     dispatch(loadUser())

}*/

//Get stats

export const PostGame = (id) => async dispatch => {
    console.log(id)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res2=  await axios.post('/api/users/jeuxtraiter',id,config)
     dispatch(Stats())

}

//login user

export const login = ({ email, password }) => async dispatch => {
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

export const UpdateUser = (Form,id) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.put(`/api/users/update/${id}`, Form, config);
        dispatch(setAlert(res.data.msg,'success'))
        dispatch(loadUser());
        setTimeout(()=>{window.location.reload(true)},4000)

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//update Password


export const UpdateAll = (Form,id) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/users/updatedetails/${id}`, Form, config);
        dispatch(setAlert(res.data.msg,'success'))
        dispatch(loadUser());
        setTimeout(()=>{window.location.reload(true)},4000)

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}



// update score

export const UpdateScore = (score, id, nbt, nbf) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(score)
    const body = {
        score: score,
        nbt: nbt,
        nbf: nbf
    }
    try {
        const res = await axios.put(`/api/users/score/${id}`, body, config);

        dispatch(loadUser());

    } catch (error) {
        throw error;
    }
}


//ForgetPassword


export const Forget = (email) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        email: email
    }

    try {
        const res = await axios.post('/api/users/forgotpassword', body, config)
        console.log(res.data)
        dispatch(setAlert(res.data.msg, 'success'))

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//ResetPassword


export const Reset = (obj) => async dispatch => {
    console.log(obj)
    const { password, token } = obj
    const config = {
        headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
        }
    }
    console.log(token)
    const body = {
        password: password
    }
    try {
        const res = await axios.post('/api/users/resetpassword', body, config)
        console.log(res.data)
        dispatch(setAlert(res.data.msg, 'success'))


    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

//Contact


export const Contact = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users/contact', data, config)
        dispatch(setAlert(res.data.msg, 'success'))


    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//parents

export const mailParents = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/users/envoyerparent', data)
        dispatch(setAlert(res.data.msg, 'success'))


    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}