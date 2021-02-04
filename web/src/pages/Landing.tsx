import React from 'react';

import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import '../styles/pages/landing.css';

//importa imagem do logo
import logoImg from "../image/logow.png";

function Landing(){
    return(
     <div id="page-landing">
     <div className=" content-wrapper">
      <img src={logoImg} alt ="ClickCampinas"/>
   
     <main>
       <h1>Viva a História da sua cidade</h1>
       <p>Embarque numa viagem rumo a um rico passado através dos pontos históricos de Campinas.</p>
    </main> 

    <div className="location">
      <strong>Campinas</strong>
      <span>São Paulo</span>
    </div>
    <Link to="/app" className="enter-app">
      <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
    </Link>
    </div>   
    
          
    </div>
    
    );
}
export default Landing;
