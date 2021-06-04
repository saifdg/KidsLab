import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import image from "../../img/petit-garçon-avec-ordinateur-personnel-illustration-de-little-boy-159890986-removebg-preview.png";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "50vh",
    width: "100%",
    fontFamily: "Nunito",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const Recompenses = () => {
  const classes = useStyles();
    useEffect(() => {
      Aos.init({ duration: 1000 });
    }, []);
  return (
    <div style={{ height: "100vh", margin: "50px" }}>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Paper
          className={classes.Paper}
          style={{
            display: "flex",
            alignItems: "cennter",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "block", margin: "50px 80px" }}
            data-aos="fade-right"
          >
            <h1 style={{ fontWeight: "bold" }}>
              Récompenses Kids<span style={{ color: "orange" }}>Lab</span> :
            </h1>
            <h2>Découvrir le plaisir d’apprendre</h2>
            <h6>
              KidsLab n’aide pas seulement vos enfants à connaître leurs tables
              de multiplication et à comprendre les fractions mais avant tout à
              découvrir le plaisir d’apprendre de nouvelles choses. KidsLab est
              une plateforme ludique qui encourage les enfants à apprendre en
              s’amusant. Contrairement aux manuels scolaires et aux exercices
              traditionnels, KidsLab propose aux enfants de relever de nombreux
              défis divertissants qui leur permettent d’acquérir les concepts
              fondamentaux.
            </h6>
            <Button
              variant="contained"
              color="primary"
              style={{
                margin: "20px 90px",
                textDecoration: "none",
                color: "#fff",
              }}
              href="/Registre"
            >
              Je m'inscrit !
            </Button>
          </div>
          <img
            src={image}
            alt="img"
            style={{ height: "50%", margin: "20px" }}
            data-aos="fade-left"
          />
        </Paper>
      </Grid>
    </div>
  );
};
