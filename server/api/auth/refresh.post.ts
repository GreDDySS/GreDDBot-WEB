import type { AuthTokens } from "../../types/types"
import { createJWT, verifyJWT } from "~/server/utils/jwt"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const sessionCookie = getCookie(event, 'session');

  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      message: 'No session found'
    })
  }
  
  try {
    const { refresh_token } = verifyJWT(sessionCookie, config.JWT_SECRET)

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
      client_id: config.public.TWITCH_CLIENT_ID,
      client_secret: config.TWITCH_CLIENT_SECRET
    })
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: params
    })

    const tokens: AuthTokens = await response.json()

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const jwtToken = createJWT(tokens, config.JWT_SECRET)

    setCookie(event, "session", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: Math.min(tokens.expires_in, 3600),
      path: '/'
    })

    return { success: true }
  } catch (error) {
    deleteCookie(event, 'session')
    throw createError({
      statusCode: 400,
      message: 'Failed to refresh token'
    })
  }
})