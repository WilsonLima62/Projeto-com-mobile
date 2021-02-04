import React, { useEffect, useState } from 'react';
//import { FaImages, FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom'

import '../styles/pages/pontosHistoricos.css';
import Sidebar from '../components/Sidebar';
import MapIcon from '../utils/mapIcon';
import api from '../services/api';

interface PontosHistoricos {
  id: number
  name: string
  latitude: number
  longitude: number  
  about: string
  instruction: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    id: number
    url: string
  }>
}

interface PontoHistoricoParams {
  id: string
}

export default function PontosHistoricos(){
  const params = useParams<PontoHistoricoParams>();
  const [pontoHistorico, setPontoHistorico]= useState<PontosHistoricos>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

   useEffect(()=>{
     api.get(`/pontosHistoricos/${params.id}`).then(response =>{
         setPontoHistorico(response.data);       
     
      })
   },[params.id]);

   if (!pontoHistorico) {
    return <p>Carregando...</p>
  }
   
    return(
        <div id="page-pontoHistorico">
        <Sidebar />
  
        <main>
          <div className="pontoHistorico-details">
            <img src={pontoHistorico.images[activeImageIndex].url} alt={pontoHistorico.name} />
  
            <div className="images">
             {pontoHistorico.images.map((image,index) =>{
               return (
                <button
                key={image.id}
                className={activeImageIndex === index ? 'active' : ''}
                onClick={() => {
                  setActiveImageIndex(index)
                }
              } 
                type="button">
                <img src={image.url} alt={pontoHistorico.name} />
              </button>
               );
             })}
              
            </div>
            
            <div className="pontoHistorico-details-content">
              <h1>{pontoHistorico.name}</h1>
              <p>{pontoHistorico.about}</p>
  
              <div className="map-container">
                <MapContainer 
                  center={[pontoHistorico.latitude,pontoHistorico.longitude]} 
                  zoom={16} 
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker interactive={false} icon={MapIcon} position={[pontoHistorico.latitude,pontoHistorico.longitude]} />
                </MapContainer>
  
                <footer>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${pontoHistorico.latitude}, ${pontoHistorico.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
                </footer>
              </div>
  
              <hr />
  
              <h2>Instruções para visita</h2>
              <p>{pontoHistorico.instruction}</p>
  
              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                  <br />
                  {pontoHistorico.opening_hours}
                </div>
                {pontoHistorico.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Precisa agendamento <br />
                  
                </div>
                 ) : (
                  <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF6690" />
                  Não Precisa agendamento <br />
                  
                </div>                  
                  )
                }
              </div>
                
              {/*<button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
                </button>*/}
            </div>
          </div>
        </main>
      </div>
 
 

    );
}
