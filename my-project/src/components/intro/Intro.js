import React, { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../img/intro.png";
import Button from "@material-ui/core/Button";
import Aos from "aos";
import "aos/dist/aos.css";
import { connect,useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Stats } from '../../action/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    fontFamily: "Nunito",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,



  },
}));

const Intro = ({ auth: { isAuthenticated },Stats }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  useEffect(() => {
    Aos.init({ duration: 2000 })
    Stats()
  }, []);

  return (
    <div>
      {isAuthenticated ? <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
        id="intro"
      >
        <Paper
          className={classes.Paper}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}>

          <div
            style={{
              display: "block",
              alignItems: "cennter",
              textAlign: "center",
              padding: "45px",
            }}
            data-aos="fade-right"
          >
            <h4>
            <h4 style={{ fontWeight: "bold", padding: "10px" }}> Merci d'avoir rejoint 
              Kids<span style={{ color: "orange" }}>Lab.</span>
            </h4>Nous espérons que notre produit pourra rendre votre éducation plus facile ,<br />
              <h4 style={{ padding: "10px" }}>
                Notre objectif est votre réussite
          </h4>
            </h4>
            <Button
              style={{ margin: "20px", textDecoration: "none", color: "#fff" }}
              variant="contained"
              color="primary"
              href="/Maths"
            >
              Commencer à traiter les compétences !
        </Button>
          </div>

          <img data-aos="fade-left" src={image} alt="" />


        </Paper>
      </Grid>
        ://////////////////////////////////////////////////////////////////////////////////////
        <Grid
          className={classes.root}
          container
          direction="row"
          justify="center"
          alignItems="center"
          id="intro"
        >
          <Paper
            className={classes.Paper}
            style={{
              display: "flex",
              alignItems: "cennter",
              width: "100%",
              justifyContent: "space-between",
            }}>

            <div
              style={{
                display: "block",
                alignItems: "center",
                textAlign: "center",
                padding: "45px",
              }}
              data-aos="fade-right"
            >
              <h2 style={{ fontWeight: "bold", padding: "10px" }}>
                Kids<span style={{ color: "orange" }}>Lab.</span>
              </h2>
              <h4>
                Sa mission est d'aider les élèves Tunisiens en proposant une
                plateforme d'apprentissage en ligne conforme aux programmes de
        l'éducation nationale du préscolaire . <br />
                <h4 style={{ padding: "10px" }}>
                  Notre objectif est votre réussite
        </h4>
              </h4>
              <Button
                style={{ margin: "20px", textDecoration: "none", color: "#fff" }}
                variant="contained"
                color="primary"
                href="/Registre"
              >
                Moi aussi je m’inscris !
      </Button>
            </div>

            <img data-aos="fade-left" src={image} alt="" />
              

          </Paper>
        </Grid>
      }
    </div>
  );
}
Intro.propTypes = {
  auth: PropTypes.object.isRequired,
  Stats:PropTypes.func.isRequired,
}
const mapStateProps = state => ({
  auth: state.Auth
});

export default connect(mapStateProps,{Stats})(Intro)