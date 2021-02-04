import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import pontoHistoricoController from './controllers/pontosHistoricosController'

const routes = Router()
const upload = multer(uploadConfig)

process.on('unhandledRejection', err => console.error(err))

// MVC

// Model
// Views
// Controllers

routes.post('/pontosHistoricos', upload.array('images'), pontoHistoricoController.create)
routes.get('/pontosHistoricos/:id', pontoHistoricoController.show)
routes.get('/pontosHistoricos', pontoHistoricoController.index)

export default routes

