import axios from 'axios';

const api = axios.create({
    baseURL: 'http://coloque_o_seu_ip:3333'
})

export default api