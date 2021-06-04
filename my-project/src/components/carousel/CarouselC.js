import React,{useEffect} from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../img/3061.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  carousel: {
    height: "28.95rem",
    background: "black",
    color: "wihte",
    position: "relative",
    width: "97%",
  },
  img: {
    height: "100%",
    bottom: "0",
    top: "0",
    right: "0",
    left: "0",
    backgroundPosition: "center",
    backgroundSize: "cover",
    opacity: "0.7",
  },
}));
export const CarouselC = () => {
  const classes = useStyles();
    useEffect(() => {
      Aos.init({ duration: 1000 });
    }, []);
  return (
    <div className={classes.root} data-aos="zoom-out-up">
      <Carousel className={classes.carousel}>
        <Carousel.Item className={classes.img} interval={2000}>
          <img src={img1} className="d-block w-100  " alt="first" />
        </Carousel.Item>
        <Carousel.Item className={classes.img} interval={2000}>
          <img src={img1} className="d-block w-100" alt="first" />
        </Carousel.Item>
        <Carousel.Item className={classes.img} interval={2000}>
          <img src={img1} className="d-block w-100" alt="first" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
