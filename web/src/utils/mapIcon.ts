import mapMarkerImg from '../image/iconw.png';
import Leaflet from 'leaflet';


const MapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    
    iconSize:[30, 40],
    iconAnchor:[15 ,40],
    popupAnchor: [0, -60]
    
  })

export default MapIcon