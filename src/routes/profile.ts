import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { edit, profileData, searchProfileData } from '../controllers/profile'
import { upload } from '../middlewares/file'


export const profileRouter = Router()
profileRouter.get('/data', authMiddleware, profileData)
profileRouter.post('/edit', authMiddleware, upload.single('image'), edit)
profileRouter.get('/search/:id', searchProfileData)
