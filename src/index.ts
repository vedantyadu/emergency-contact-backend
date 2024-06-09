import express, { Express, json } from 'express'
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { accountRouter } from './routes/account'
import cors from 'cors'
import { profileRouter } from './routes/profile'
import { QRRouter } from './routes/qr'

config()

const PORT = process.env.PORT

const app: Express = express()
export const prisma: PrismaClient = new PrismaClient()

app.use(json())
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}))


app.use('/account', accountRouter)
app.use('/profile', profileRouter)
app.use('/qr', QRRouter)


app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
