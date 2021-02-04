import { Request, Response } from 'express'
import pontoHistorico from '../models/pontosHistoricosModel'
import pontosHistoricosView from '../views/pontosHistoricos_view'
import * as Yup from 'yup'

import { getRepository } from "typeorm"
import pontosHistoricos from '../models/pontosHistoricosModel'

export default {

    async show(req: Request, res: Response) {
        console.log('pontosHistoricosController.show');
        const { id } = req.params
        const pontosHistoricosRepository = getRepository(pontosHistoricos)

        const pontoHistorico = await pontosHistoricosRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(pontosHistoricosView.render(pontoHistorico))
    },

    async index(req: Request, res: Response) {
        console.log('pontosHistricosControler.index');
        const pontosHistoricosRepository = getRepository(pontoHistorico)

        //retorna o  ponto Historico com a imagem
        const pontosHistoricos = await pontosHistoricosRepository.find({
            relations: ['images']
        })

        return res.json(pontosHistoricosView.renderMany(pontosHistoricos))
    },
    async create(req: Request, res: Response) {
        console.log('pontosHistoricosController.create');
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body
    
        const pontosHistoricosRepository = getRepository(pontoHistorico)

        //fazendo upload de imagem
        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }
         //validação com yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(800),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            }))
        })

    
        //retorna todos os erros juntos
        await schema.validate(data, {
            abortEarly: false
        })

        const Historico = await pontosHistoricosRepository.create(data)
    
        await pontosHistoricosRepository.save(Historico)
        return res.status(201).json(pontoHistorico)
    }
}