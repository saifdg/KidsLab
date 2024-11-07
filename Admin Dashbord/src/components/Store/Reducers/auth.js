import { GET_JEUX3,GET_JEUX2,GET_JEUX1,GET_COMPETANCE,GET_CATEGORIE,GET_USER, GET_ERROR, GET_USERS, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../../../action/type';
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    edit: null,
    user: null,
    users: null,
    competances:null,
    categorie:null,
    jeux1:null,
    jeux2:null,
    jeux3:null,

}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case GET_USERS:
            return {
                ...state,
                users: payload
            };
            case GET_JEUX1:
            return {
                ...state,
                jeux1: payload
            };
            
            case GET_COMPETANCE:
                return {
                    ...state,
                    competances: payload
                };
                   
            case GET_CATEGORIE:
                return {
                    ...state,
                    categorie: payload
                };
            case GET_JEUX2:
                return {
                    ...state,
                    jeux2: payload
                };
             case GET_JEUX3:
                    return {
                        ...state,
                        jeux3: payload
                    };
               case GET_USER:
                     return {
                       ...state,
                      edit: payload
                     };
        case GET_ERROR:
            return {
                ...state,
                users: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }

}