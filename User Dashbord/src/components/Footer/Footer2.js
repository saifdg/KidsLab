import React from 'react'
import './Botton.css';
import { Link } from "@material-ui/core";
import { useSelector } from 'react-redux';
const Footer2 = () => {
  const state = useSelector(state => state.Auth)
  return (

    <footer class="footer">
      <div class="footer-left col-md-4 col-sm-6">
        <p class="about">
          <span style={{ fontSize: '20px' }}> A propos nous</span>  Notre site est un site Web d'apprentissage en ligne où vous
          pouvez faire apprendre les mathématiques à vos enfants en leur
          faisant faire des compétences Selon leur niveau et tout cela en
          jouant
        </p>
        <div class="icons">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-linkedin"></i></a>
          <a href="#"><i class="fa fa-google-plus"></i></a>
          <a href="#"><i class="fa fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-center col-md-4 col-sm-6">
        <div>
          <i class="fa fa-map-marker"></i>
          <p><span> Nom et numéro de rue</span> Monastir, Tunisie</p>
        </div>
        <div>
          <i class="fa fa-phone"></i>
          <p> (+216) 72 320 100</p>
        </div>
        <div>
          <i class="fa fa-envelope"></i>
          <p><a href="#"> KidsLab@gmail.com</a></p>
        </div>
      </div>
      <div class="footer-right col-md-4 col-sm-6">
        <h2> Kids<span> Lab</span></h2>
        <p class="menu">
          <Link href="/"> Accueil</Link> |
          <Link href="/Suivi-des-progrès"> Suivi-des-progrés</Link> |
          <Link href="/Maths"> Maths</Link> |
          <Link href="/Récompenses"> Récompenses</Link> |
          {state.isAuthenticated ? <>
            <Link href="/Forum">Forum</Link> |
          </> :
            <>

              <Link href="/Registre"> S'inscrire</Link> |
            </>
          }
          <Link href="/ContactUs"> Contact</Link>
        </p>
        <p class="name"> KidsLab &copy; 2021</p>
      </div>
    </footer>

  )
}

export default Footer2
