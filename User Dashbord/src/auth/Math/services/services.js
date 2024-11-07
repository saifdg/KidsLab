import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Cards from "./Card/card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import img1 from "../../../img/images1.jfif"
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontFamily: "Nunito",
    margin: "-50px  -100px",
  },
}));

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  fontfamily: Nunito;
  height:auto
`;

const Title = styled.h1`
  font-size: 20px;
  color: #000;
  margin:20px 20px
`;

const ServicesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 90px;
`;

function Services() {
   const classes = useStyles();
  const [offeredServices, setServices] = useState({location:[]});

 

  useEffect(async () => {
    const result = await Axios.get(
      '/api/categorie',
    );
 
    setServices({location: result.data});

    Aos.init({ duration: 1000 });
  },[]);

  return (
    <Paper elevation={2} style={{width:'100%',height:'auto',  background: 'rgba(0, 0, 0, 0.5)'}}>
    <ServicesContainer>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Paper
          className={classes.Paper}
          elevation={10}
          style={{
            display: "block",
            alignItems: "cennter",
            width: "100%",
         
            justifyContent: "space-between",
            marginBottom:'50px',
            marginTop:'80px'
          }}
          data-aos="zoom-out-up"
        >
          <h2 style={{textAlign:'center',fontWeight:'bold',fontFamily:'nunito'}}>Maths</h2>
          <Title>
            Sur <span style={{fontWeight:'bold'}}> Kids<span style={{ color: "orange" }}>Lab</span></span> , les
            mathématiques ne sont pas qu'une histoire de chiffres. Grâce à ses
            questions illimitées, à ses exercices interactifs et engageants et à
            ses scénarios de la vie quotidienne,  <span style={{fontWeight:'bold'}}> Kids<span style={{ color: "orange" }}>Lab</span></span> permet aux élèves de
            découvrir les mathématiques sous un jour nouveau et fascinant !
          </Title>
        </Paper>
      </Grid>

      <ServicesWrapper data-aos="fade-right">
        {offeredServices.location.map((service, idx) => (
          <Cards key={idx} {...service} />
        ))}
      </ServicesWrapper>
    </ServicesContainer>
    </Paper>
  );
}

export default Services;
