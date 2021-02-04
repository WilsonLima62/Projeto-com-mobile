import Image from '../models/ImagesModel'

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://SEU_IP_AQUI_TB:3333/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}

