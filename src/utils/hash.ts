import crypto from 'crypto'

export default function hash(data: string) {
  return crypto.createHash('sha256').update(data).digest('base64')
}
