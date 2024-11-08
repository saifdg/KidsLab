import axios from 'axios';
import { GET_JEUX3, GET_JEUX2, GET_JEUX1, GET_COMPETANCE, GET_CATEGORIE, GET_USER, GET_ERROR, GET_USERS, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './type';
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
export const GetUsers = () => async dispatch => {


    try {
        const res = await axios.get('/api/users');
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERROR
        })
    }
}
export const GetCategories = () => async dispatch => {

    try {
        const res = await axios.get('/api/categorie');
        dispatch({
            type: GET_CATEGORIE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERROR
        })
    }
}
export const GetCompetances = () => async dispatch => {

    try {
        const res = await axios.get('/api/competance');
        dispatch({
            type: GET_COMPETANCE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERROR
        })
    }
}
export const GetJeux1 = () => async dispatch => {

    try {
        const res = await axios.get('/api/jeux1');
        dispatch({
            type: GET_JEUX1,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERROR
        })
    }
}

export const GetJeux2 = () => async dispatch => {

    try {
        const res = await axios.get('/api/jeux2');
        dispatch({
            type: GET_JEUX2,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERROR
        })
    }
}
export const GetJeux3 = () => async dispatch => {

    try {
        const res = await axios.get('/api/jeux3');
        dispatch({
            type: GET_JEUX3,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERROR
        })
    }
}
export const GetUser = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/users/${id}`);
        dispatch({
            type: GET_USER,
            payload: res.data.user
        })
    } catch (err) {
        dispatch({
            type: GET_ERROR
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

        const res = await axios.post('/api/users/admin', Form, config);


        /*dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });*/
        dispatch(setAlert(res.data.msg, "success"))
        dispatch(loadUser());
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Users") }, 2000)
        // setTimeout(() => { window.location.reload(true) }, 4000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
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
        const res = await axios.post('/api/admin/auth', body, config);
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

export const UpdateUser = ({ firstName, lastName, file, id }) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { firstName, lastName, file };


    try {
        const res = await axios.put(`/api/users/updatedetails/${id}`, body, config);
        dispatch(setAlert(res.data.msg, 'success'))
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Users") }, 2000)
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
        dispatch(setAlert(res.data.msg, 'success'))
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

//Create categorie


export const CreateCategorie = (Form) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.post('/api/categorie', Form, config);

        dispatch(setAlert(res.data.msg, 'success'))
        dispatch(loadUser());
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Categories") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//Create Compétance


export const CreateCompetence = ({ name, categorie }) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = { name };


    try {
        const res = await axios.post(`/api/competance/${categorie}`, body, config);
        dispatch(setAlert(res.data.msg, 'success'));
        dispatch(loadUser());
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Competences") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//Create Jeux1


export const CreateJeux1 = (Form, competence) => async dispatch => {



    try {
        const res = await axios.post(`/api/jeux1/${competence}`, Form);

        dispatch(setAlert(res.data.msg, 'success'));
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Jeux1") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

//Create Jeux2


export const CreateJeux2 = (Form, competence) => async dispatch => {
    console.log(competence)
    try {
        const res = await axios.post(`/api/jeux2/${competence}`, Form);
        dispatch(setAlert(res.data.msg, 'success'));
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Jeux2") }, 2000)
    } catch (error) {
        throw error;
    }
}


//Create jeux3


export const CreateJeux3 = ({ question, reponse, jeuxType, competence, categorie }) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = { question, reponse, jeuxType, categorie };


    try {
        const res = await axios.post(`/api/jeux3/${competence}`, body, config);
        dispatch(setAlert(res.data.msg, 'success'));
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Jeux3") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

///update user by user
export const AdminUpdateUser = (Form, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/admin/update/${id}`, Form, config);
        dispatch(setAlert(res.data.msg, 'success'))
        //  setTimeout(()=>{ window.location.reload(true)},3000)
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Users") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


///update categorie by user
export const AdminUpdateCategorie = (Form, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(id)

    try {
        const res = await axios.put(`/api/categorie/${id}`, Form, config);
        dispatch(setAlert(res.data.msg, 'success'))
        //   setTimeout(()=>{ window.location.reload(true)},3000)
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Categories") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

//update competance

export const AdminUpdateCompetance = (body, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/competance/${id}`, body, config);
        dispatch(setAlert(res.data.msg, 'success'))
        //    setTimeout(()=>{ window.location.reload(true)},3000)
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Competences") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//update jeux1

export const AdminUpdateJeux1 = (Form, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/jeux1/${id}`, Form, config);
        dispatch(setAlert(res.data.msg, 'success'))
        //    setTimeout(()=>{ window.location.reload(true)},3000)
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Jeux1") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

//update jeux2

export const AdminUpdateJeux2 = (Form, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log(id)
    try {
        const res = await axios.put(`/api/jeux2/${id}`, Form, config);
        dispatch(setAlert(res.data.msg, 'success'))
        //    setTimeout(()=>{ window.location.reload(true)},3000)
        setTimeout(() => { window.location.replace("http://localhost:8000/app/Jeux2") }, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


//update jeux3

export const AdminUpdateJeux3 = ({ question, reponse, jeuxType, competance, categorie }, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        question, reponse, jeuxType, categorie, competance, categorie
    }
    try {
        const res = await axios.put(`/api/jeux3/${id}`, body, config);
        dispatch(setAlert(res.data.msg, 'success'))
        //    setTimeout(()=>{ window.location.reload(true)},3000)
        setTimeout(()=>{window.location.replace("http://localhost:8000/app/Jeux3")}, 2000)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}