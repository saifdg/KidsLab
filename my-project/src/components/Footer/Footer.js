import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";


export const Footer = () => {
  return (
      <footer className={classes.footer}>
        <div className={classes.main}>
          <div className={classes.box}>
            <h2>A propos nous</h2>
            <div className={classes.content}>
              <p>
                Notre site est un site Web d'apprentissage en ligne où vous
                pouvez faire apprendre les mathématiques à vos enfants en leur
                faisant faire des compétences Selon leur niveau et tout cela en
                jouant
              </p>
              <div className={classes.social}>
                <Link to="/">
                  <span href="/Maths" className="fab fa-facebook-f"></span>
                </Link>
                <Link to="/">
                  <span className="fab fa-twitter"></span>
                </Link>
                <Link to="/">
                  <span className="fab fa-instagram"></span>
                </Link>
                <Link to="/">
                  <span className="fab fa-youtube"></span>
                </Link>
              </div>
            </div>
          </div>

          <div className={classes.center}>
            <h2>Addresse</h2>
            <div className={classes.place}>
              <div className={classes.placee}>
                <span className="fas fa-map-marker-alt"></span>
                <p className={classes.text}>Tunisie, Zaghouan</p>
              </div>
              <div className={classes.phone}>
                <span className="fas fa-phone-alt"></span>
                <p className={classes.text}>00000000</p>
              </div>
              <div className={classes.placee}>
                <span className="fas fa-envelope"></span>
                <p className={classes.text}>bmcaf.consulting@gmail.com</p>
              </div>
            </div>
          </div>

          <div className={classes.right}>
            <h2>Nous contacter</h2>
            <div className={classes.contente}>
              <form className={classes.form}>
                <label className={classes.texte}>Email *</label>
                <input type="email" required />
                <label className={classes.texte}>Message *</label>
                <textarea name="textarea" id="" cols="30" rows="10"></textarea>
                <button type="submit">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <center className={classes.centere}>
            <span className="credit">
              Created By <a href="/">Saif&Ala</a> |{" "}
            </span>
            <span className="far fa-copyright"></span>
            <span> 2021 All rights reserved.</span>
          </center>
        </div>
      </footer>
  );
};
