import axios from 'axios';

const api = axios.create({
    baseURL: 'http://SEU_IP_AQUI_TB:3333'
})

export default api