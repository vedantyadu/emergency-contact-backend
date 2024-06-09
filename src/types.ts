import { JwtPayload } from 'jsonwebtoken'
import { User } from '@prisma/client'
import { Request } from 'express'

export interface Req<Type> extends Request {
  body: Type
}

export type AuthToken = JwtPayload & {
  auth: boolean,
  id: User['id'] | undefined,
  expires: number
}

export type AuthRequest = Request  & {
  userid?: string
}

export type EditRequest = AuthRequest & {
  file?: Express.Multer.File
}
