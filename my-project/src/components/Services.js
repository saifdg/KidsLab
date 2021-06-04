import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";
import Axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "120vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Nunito",
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    color: "#fff",
    fontSize: "40px",
    fontWeight: "bold",
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "90px",
  },
}));
function Services() {
  const classes = useStyles();
  const [offeredServices, setServices] = useState({location:[]});


  useEffect(async () => {
    const result = await Axios.get(
      '/api/categorie',
    );
 
    setServices({location: result.data});

    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className={classes.root}>
      <h2 data-aos="flip-down" className={classes.title}>
        Les catégories disponible :
      </h2>
      <div data-aos="zoom-in" className={classes.wrapper}>
        {offeredServices.location.map((service, idx) =>  (
          <ImageCard key={idx} {...service} />
          
        ))}
      </div>
    </div>
  );
}

export default Services;
