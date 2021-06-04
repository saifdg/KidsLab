import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header";
import { Title } from "./components/Title";
import { Recompenses } from "./auth/Recompenses/Recompenses";
import { Suivi } from "./auth/Suivi/Suivi";
import { CarouselC } from "./components/carousel/CarouselC";
import { Footer } from "./components/Footer/Footer";
import Services from "./components/Services";
import  Intro  from "./components/intro/Intro";
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




///////////////////////////////////////////////////////





///////////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/math2.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
              </Switch>
            </section>
            <Footer />
          </div>
        </Router>
        </GameProvider>
      </PersistGate>
    </Provider>
  );
}
