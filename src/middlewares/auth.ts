import { JWT_PRIVATE_KEY } from '../utils/envvars'
import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { prisma } from '..'
import { AuthToken, AuthRequest } from '../types'


enum AuthErrorTypes {
  notoken = 'NO_TOKEN_ERROR',
  expired = 'TOKEN_EXPIRED_ERROR',
  invaliduserid = 'INVALID_USERID_ERROR'
}

class AuthError extends Error {
  constructor(message: AuthErrorTypes) {
    super(message)
    this.name = message
  }
}


export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      throw new AuthError(AuthErrorTypes.notoken)
    }

    const data = jwt.verify(req.headers.authorization as string, JWT_PRIVATE_KEY) as AuthToken
    const user = await prisma.user.findFirst({where: {id: data.id}})
    
    if (!user) {
      throw new AuthError(AuthErrorTypes.invaliduserid)
    }

    if (Date.now() < data.expires) {
      req.userid = user.id
      next()
    }
    else {
      throw new AuthError(AuthErrorTypes.expired)
    }
  }
  catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({message: 'Invalid token'})
    }
    else if (err instanceof AuthError) {
      res.status(401).json({message: err.message})
    }
    else {
      res.status(500).send({message: 'Internal server error'})
    }
  }
}
