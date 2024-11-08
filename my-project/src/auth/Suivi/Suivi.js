import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import image1 from "../../img/s1.png";
import image2 from "../../img/s2.png";
import image3 from "../../img/s3.PNG";
import Aos from "aos";
import "aos/dist/aos.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import image4 from "../../img/1.jpg";
import image5 from "../../img/2-removebg-preview.png";
import image6 from "../../img/3.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontFamily: "Nunito",
    margin: "0 -100px",
  },
  paper: {
    padding: "50",
    display: "flex",
    width: "80%",
    marginLeft: "60px",
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

const Suivi = ({ auth: { isAuthenticated } }) => {
  const classes = useStyles();

  const fetch = async () => {
    const res = await axios.get("/api/users");
    setUser({ location: res.data });
  };
  const [user, setUser] = useState({ location: [] });
  useEffect(() => {
    //  if(isAuthenticated){
    fetch();
    // }
    Aos.init({ duration: 1000 });
  }, []);

  /* useEffect(() => {
     setUser({location:[...user.location.sort((a, b) => (a.score > b.score) ? 1 : -1)]})
   }, [user])*/
  const array = user.location.sort((a, b) => (a.score < b.score ? 1 : -1));
  console.log(array);
  return (
    <div style={{ margin: "80px", width: "110%" }}>
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
            display: "block",
            alignItems: "cennter",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {!isAuthenticated ? (
            <>
              <div style={{ display: "flex", margin: "40px 50px" }}>
                <div style={{ display: "block" }}>
                  <h1 style={{ fontWeight: "bold" }}>
                    Analyses d'Kids<span style={{ color: "orange" }}>Lab</span>{" "}
                    :
                  </h1>
                  <h3>
                    Des comptes-rendus qui vont plus loin que les chiffres
                  </h3>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{ display: "block", margin: "20px 100px" }}
                  data-aos="fade-right"
                >
                  <h3 style={{ color: "#49c726" }}>
                    Une vue d'ensemble intuitive des performances de vos enfants
                  </h3>
                  <h6>
                    Déterminez les points forts et faibles de vos enfants grâce
                    à une méthode inédite ! Dès qu'un enfant travaille, les
                    Analyses d'KidsLab vous informent de ses progrès. Grâce à
                    des données pertinentes fournies en temps réel qui vous
                    tiennent au courant de leurs progrès, vous pouvez aider vos
                    enfants et les motiver.
                  </h6>
                </div>
                <img
                  src={image1}
                  alt="img1"
                  style={{ margin: "10px 40px" }}
                  data-aos="fade-left"
                />
              </div>
              <div style={{ display: "flex", margin: "20px" }}>
                <img
                  src={image2}
                  alt="img1"
                  style={{ margin: "10px 40px" }}
                  data-aos="fade-right"
                />
                <div
                  style={{ display: "block", margin: "20px 100px" }}
                  data-aos="fade-left"
                >
                  <h3 style={{ color: "#49c726" }}>
                    De précieuses informations disponibles en un clic
                  </h3>
                  <h6>
                    KidsLab convertit les données des exercices de vos enfants
                    en vues d'ensemble simples qui vous aident à identifier les
                    informations importantes. En quelques clics, découvrez la
                    progression de vos enfants, identifiez leurs difficultés et
                    déterminez leur capacité à réussir leurs contrôles et
                    examens.
                  </h6>
                </div>
              </div>
              <div style={{ display: "flex", margin: "20px" }}>
                <div
                  style={{ display: "block", margin: "20px 100px" }}
                  data-aos="fade-right"
                >
                  <h3 style={{ color: "#49c726" }}>
                    Des données qui renforcent l'efficacité de l'apprentissage
                  </h3>
                  <h6>
                    Parce que votre temps est précieux, les comptes-rendus
                    d'KidsLab vous fournissent les informations pratiques qui
                    vous permettent de choisir les stratégies les plus efficaces
                    pour aider vos enfants. Grâce aux Analyses d'KidsLab,
                    identifiez précisément les besoins de vos enfants et
                    résolvez leurs difficultés de façon plus efficace.
                  </h6>
                </div>
                <img
                  src={image3}
                  alt="img1"
                  style={{ margin: "10px 40px", width: "100%" }}
                  data-aos="fade-left"
                />
              </div>
              <div
                style={{
                  display: "block",
                  margin: "60px 300px",
                  alignItems: "center",
                }}
                data-aos="zoom-out-up"
              >
                <h3>Débloquez le pouvoir des Analyses d'KidsLab</h3>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "20px 200px",
                    textDecoration: "none",
                    color: "#fff",
                  }}
                  href="/Registre"
                >
                  Inscriver-vouz
                </Button>
              </div>
            </>
          ) : (
            <div style={{ display: "block", alignItems: "center" }}>
              <h1
                style={{
                  fontWeight: "bold",
                  marginLeft: "80px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Tableau de classement :
              </h1>
              {array.map((users, i) => (
                <Paper elevation={10} className={classes.paper} key={i}>
                  <Grid
                    alignItems="center"
                    style={{
                  
                      alignItems: "center",
                      display: "flex",
                      width:"100%",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: "20px",
                        marginTop: "10px",
                      
                      }}
                    >
                      {i == 0 && users.score !== 0 ? (
                        <img
                          src={image4}
                          style={{ height: "15%", width: "50px" }}
                        />
                      ) : i == 1 && users.score !== 0 ? (
                        <img
                          src={image5}
                          style={{ height: "15%", width: "50px" }}
                        />
                      ) : i == 2 && users.score !== 0 ? (
                        <img
                          src={image6}
                          style={{ height: "15%", width: "50px" }}
                        />
                      ) : (
                        <h5
                          style={{
                            color: "#000",
                            borderRadius: "10px",
                            border: "2px solid #000",
                            padding: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {i + 1}
                        </h5>
                      )}
                    </div>
                    <Avatar src={users.file} style={{ marginLeft: "30px" }} />
                    <h4 style={{ marginLeft: "10px", fontWeight: "bold" ,textOverflow: "ellipsis",}}>
                      {users.firstName.charAt(0).toUpperCase() + users.firstName.slice(1)} {users.lastName}
                    </h4>
                    <h3
                      style={{
                        marginLeft: "auto",
                        marginTop: "10px",
                        color: "#000",
                        borderRadius: "10px",
                        border: "2px solid #30c9c4",
                        padding: "10px",
                        fontWeight: "bold",
                        
                      }}
                    >
                      Score:{users.score}
                    </h3>
                  </Grid>
                </Paper>
              ))}
            </div>
          )}
        </Paper>
      </Grid>
    </div>
  );
};
Suivi.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auth: state.Auth,
});
export default connect(mapStateProps, null)(Suivi);
