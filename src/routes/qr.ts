import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { generateQR } from '../controllers/qr'


export const QRRouter = Router()
QRRouter.get('/generate', authMiddleware, generateQR)
