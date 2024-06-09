import { prisma } from '..'
import { AuthRequest, EditRequest } from '../types'
import { Request, Response } from 'express'
import excludeKeys from '../utils/excludekeys'
import sharp from 'sharp'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'


export async function searchProfileData(req: Request, res: Response) {
  try {
    const user = await prisma.user.findFirst({where: {id: req.params.id}})
    if (!user) {
      throw new Error()
    }
    res.status(200).json(excludeKeys(user, ['password']))
  }
  catch (err) {
    res.status(500).json({message: 'Internal server error'})
  }
}

export async function profileData(req: AuthRequest, res: Response) {
  try {
    const user = await prisma.user.findFirst({where: {id: req.userid}})
    if (!user) {
      throw new Error()
    }
    const cleanUser = excludeKeys(user, ['password'])
    res.status(200).json(cleanUser)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({message: 'Internal server error'})
  }
}


export async function edit(req: EditRequest, res: Response) {
  try {
    const body = JSON.parse(req.body.details)
    
    if (req.file) {
      const buffer = await sharp(req.file.buffer).jpeg().resize({height: 400, width: 400}).toBuffer()
      const storageRef = ref(storage, `user/${req.userid}.jpeg`)
      const metadata = {contentType: 'jpeg'}
      const snapshot = await uploadBytesResumable(storageRef, buffer, metadata)
      const downloadURL = await getDownloadURL(snapshot.ref)
      await prisma.user.update({where: {id: req.userid}, data: {...body, imageurl: downloadURL}})
      res.status(200).json({imageurl: downloadURL, message: 'Profile updated successfully'})
    }
    else {
      await prisma.user.update({where: {id: req.userid}, data: body})
      res.status(200).json({message: 'Profile updated successfully'})
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({message: 'Internal server error'})
  }
}
