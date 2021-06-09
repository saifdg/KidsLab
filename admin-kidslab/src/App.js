import React,{useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import Login from './components/Login/Login';
import { Provider } from "react-redux";
import { store, persistor } from './components/Store/Store'
import { PersistGate } from 'redux-persist/integration/react'
import Dashboard from './components/auth/Dashboard/Dashboard';
import setAuthToken from './utlis/setAuthToken'
import {loadUser} from './action/auth'


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path='/login' component={Login} />
            <Route path='/app' component={Dashboard} />
            </Switch>
          
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

////////////////////////////////////////////////////////////////////////////////
