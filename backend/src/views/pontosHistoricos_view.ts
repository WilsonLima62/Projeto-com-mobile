import Ponto from '../models/pontosHistoricosModel'
import imageView from './imagesView'

export default {
    render(ponto: Ponto) {
        return {
            id: ponto.id,
            name: ponto.name,
            latitude: ponto.latitude,
            longitude: ponto.longitude,
            about: ponto.about,
            instructions: ponto.instructions,
            opening_hours: ponto.opening_hours,
            open_on_weekends: ponto.open_on_weekends,
            images: imageView.renderMany(ponto.images)
        }
    },

    renderMany(pontos: Ponto[]) {
        return pontos.map(ponto => this.render(ponto))
    }
}