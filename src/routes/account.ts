import { Request, Response, Router } from 'express'
import { auth, signup, login } from '../controllers/account'
import { authMiddleware } from '../middlewares/auth'


export const accountRouter = Router()
accountRouter.get('/auth', authMiddleware, auth)
accountRouter.post('/signup', signup)
accountRouter.post('/login', login)
