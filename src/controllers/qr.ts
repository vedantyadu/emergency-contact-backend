import { Response } from 'express'
import { AuthRequest } from '../types'
import QRCode from 'qrcode'
import { baseURL } from '../utils/utils'


export async function generateQR(req: AuthRequest, res: Response) {
  try {
    const { color, bgcolor } = req.query
    const url = `${baseURL}/search/${req.userid}`
    const svg = await QRCode.toString(url, {width: 200, type: 'svg', color: {dark: color as string, light: bgcolor as string}, margin: 0})
    const svg64 = 'data:image/svg+xml;base64,' + btoa(svg)
    res.status(200).json({svg: svg64})
  }
  catch (err) {
    res.status(500).json({message: 'Internal server error'})
  }
}
