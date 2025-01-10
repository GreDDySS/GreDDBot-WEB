import jwt from 'jsonwebtoken'
import type { AuthTokens } from '../types/types'

interface JWTPayload {
  access_token: string
  refresh_token: string
  expires_in: number
}

export function createJWT(tokens: AuthTokens, secret: string): string {
  return jwt.sign({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_in: tokens.expires_in
  }, secret, { expiresIn: tokens.expires_in })
}

export function verifyJWT(token: string, secret: string): JWTPayload {
  return jwt.verify(token, secret) as JWTPayload
}