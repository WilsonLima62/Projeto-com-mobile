import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight,FiArrowLeft} from 'react-icons/fi';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';


import mapMarkerImg from '../image/logow.png';

import '../styles/pages/pontosHistoricosMap.css';
import MapIcon from "../utils/mapIcon";
import api from "../services/api";


interface PontosHistoricos {
   id: number;
   name: string;
   latitude: number;
   longitude: number;
}


function PontosHistoricosMap(){
   const [pontosHistoricos, setPontosHistoricos]= useState<PontosHistoricos[]>([])

   useEffect(()=>{
     api.get('/pontosHistoricos').then(response =>{
         setPontosHistoricos(response.data);       
     
      })
   },[]);

   return(
    <div id="page-map">
       <aside>
          <header>
             <img src={mapMarkerImg} alt="Icon"/>
              <h2>Escolha um ponto Histórico no mapa</h2>
              <p>E conheça um pouco mais da história de sua cidade.</p>
          </header>

          <footer>
             <strong>Campinas</strong>
             <span>São Paulo</span>
          </footer>
          <Link to ="/" className="button">
              <FiArrowLeft size={24} color="#FFF" />
          </Link>
       </aside>

       <MapContainer
          center={[-22.9006421,-47.0972342]}
          zoom={15}
          style={{width:'100%', height: '100%'}}
          >
         {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TileLayer 
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
         />*/}
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
          
          
          {pontosHistoricos.map(pontoHistorico =>{
            return (
               <Marker
                   key={pontoHistorico.id}
                    position={[pontoHistorico.latitude,pontoHistorico.longitude]}
                   
                    icon={MapIcon}
                   
                  >

                   <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        {pontoHistorico.name}
                         
                        <Link to={`/pontosHistoricos/${pontoHistorico.id}`}>
                              <FiArrowRight size={32} color="#fff" />
                        </Link>
                  </Popup>  
             </Marker>   
            )
         })}              
                    
         </MapContainer>            
           

      <Link to="/pontosHistoricos/create" className="create-pontoHistorico">
         <FiPlus size={32}color="#FFF"/>
      </Link>
    </div>

   )
}
export default PontosHistoricosMap