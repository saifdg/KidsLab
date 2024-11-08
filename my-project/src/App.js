import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header";
import { Title } from "./components/Title";
import { Recompenses } from "./auth/Recompenses/Recompenses";
import Suivi from "./auth/Suivi/Suivi";
import { CarouselC } from "./components/carousel/CarouselC";
import { Footer } from "./components/Footer/Footer";
import Services from "./components/Services";
import Intro from "./components/intro/Intro";
import Registre from "./auth/registre/Registre";
import Math from "./auth/Math/Math";
import setAuthToken from "./components/utils/setAuthToken";
import { loadUser } from './action/auth'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { store, persistor } from './components/store/store'
import Categorie from "./auth/Categorie/Categorie";
import Profile from "./auth/Profile/Profile";
import Games from "./auth/gameWrapper/Games";
import GameProvider from "./auth/gameWrapper/Context/GameProvider";
import { GameContext } from './auth/gameWrapper/Context/GameProvider';
import ForgetPassword from "./auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./auth/ResetPassword/ResetPassword";
import Validation from "./auth/Validation/Validation";
import Footer2 from "./components/Footer/Footer2";
import Footer3 from "./components/Footer/Footer3";
import ContactUs from "./components/Contact/ContactUs";
import Posts from "./auth/Posts/Posts";
import Post from "./auth/Posts/Post";
import Parents from "./auth/Parents/Parents";
import Stats from "./auth/Stats/Stats"
import Formateur from "./auth/Formateur/Formateur";



///////////////////////////////////////////////////////





///////////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/math2.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflowY : 'hidden' ,

  },
}));

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {

  const classes = useStyles();
  useEffect(() => {
    store.dispatch(loadUser())
    
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GameProvider>
          <Router>
            <div className={classes.root}>
              <CssBaseline />
              <Header />
              <Route exact path="/" component={Title} />
              <Route exact path="/" component={Intro} />
              <Route exact path="/" component={Services} />
              <Route exact path="/" component={CarouselC} />
              <section className="container">
                <Switch>
                  <Route exact path="/Maths" component={Math} />
                  <Route exact path="/Récompenses" component={Recompenses} />
                  <Route exact path="/Registre" component={Registre} />
                  <Route exact path="/Suivi-des-progrès" component={Suivi} />
                  <Route exact path="/Profile" component={Profile} />
                  <Route exact path="/Categorie/:id" component={Categorie} />
                  <Route exact path="/Games/:id/:categorie" component={Games} />
                  <Route exact path="/ForgetPassword" component={ForgetPassword} />
                  <Route exact path="/user/resetpassword/:token" component={ResetPassword} />
                  <Route exact path="/user/validation/:token" component={Validation} />
                  <Route exact path="/ContactUs" component={ContactUs} />
                  <Route exact path="/Forum" component={Posts} />
                  <Route exact path="/post/:id" component={Post} />
                  <Route exact path="/ParentsZone" component={Parents} />
                  <Route exact path="/Statistics/:id/:type" component={Stats} />
                  <Route exact path="/Formateur" component={Formateur} />
                </Switch>
              </section>
              <Footer2/>
            </div>
          </Router>
        </GameProvider>
      </PersistGate>
    </Provider>
  );
}
