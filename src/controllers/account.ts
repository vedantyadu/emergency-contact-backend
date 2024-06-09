import { Prisma, User } from '@prisma/client'
import { AuthRequest, AuthToken, Req } from '../types'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '..'
import hash from '../utils/hash'
import { EXPIRE_MS, JWT_PRIVATE_KEY } from '../utils/envvars'
import createID from '../utils/createid'


type loginInfo = {
  email: User['email'],
  password: User['password']
}

enum LoginErrorTypes {
  login = 'LOGIN_ERROR'
}

class LoginError extends Error {
  constructor(error: LoginErrorTypes, message: string) {
    super(message)
    this.name = message
  }
}



type signupInfo = {
  fullname: User['fullname']
  email: User['email'],
  password: User['password']
}

enum SignupErrorTypes {
  shortpassword = 'SHORT_PASSWORD_ERROR',
  fullname = 'FULL_NAME_ERROR'
}

class SignupError extends Error {
  constructor(error: SignupErrorTypes, message: string) {
    super(message)
    this.name = message
  }
}


export async function signup(req: Req<signupInfo>, res: Response) {
  try {
    if (req.body.password.length < 5) {
      throw new SignupError(SignupErrorTypes.shortpassword, 'Password must contain atleast 5 characters')
    }
    if (req.body.fullname.length < 1) {
      throw new SignupError(SignupErrorTypes.fullname, 'Enter a valid full name')
    }
    await prisma.user.create({data: {id: createID(16), email: req.body.email, fullname: req.body.fullname, password: hash(req.body.password)}})
    res.status(200).json({message: 'Account created successfully'})
  }
  catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code == 'P2002') {
        res.status(409).json({message: 'Email already taken'})
      }
    }
    else if (err instanceof SignupError) {
      res.status(403).json({message: err.message})
    }
    else {
      console.log(err)
      res.status(500).json({message: 'Internal server error'})
    }
  }
}


export async function login(req: Req<loginInfo>, res: Response) {
  try {
    const user = await prisma.user.findFirst({where: {email: req.body.email, password: hash(req.body.password)}})

    if (!user) {
      throw new LoginError(LoginErrorTypes.login, 'Invalid username or password')
    }
    const authtoken = jwt.sign({id: user.id, expires: (Date.now() + Number(EXPIRE_MS))} as AuthToken, JWT_PRIVATE_KEY)
    res.status(200).json({authtoken, userid: user.id, auth: true})
  }
  catch (err) {
    if (err instanceof LoginError) {
      res.status(401).json({message: err.message})
    }
    else {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}


export async function auth(req: AuthRequest, res: Response) {
  try {
    res.status(200).json({auth: true, id: req.userid})
  }
  catch(err) {
    res.status(500).json({message: 'Internal server error'})
  }
}
