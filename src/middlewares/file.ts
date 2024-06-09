import { NextFunction, Response } from 'express'
import { AuthRequest, EditRequest } from '../types'
import multer from 'multer'


const storage = multer.memoryStorage()
export const upload = multer({storage: storage})
