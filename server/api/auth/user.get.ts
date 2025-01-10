import { verifyJWT } from "~/server/utils/jwt"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const sessionCookie = getCookie(event, "session")

  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  try {
    const { access_token } = verifyJWT(sessionCookie, config.JWT_SECRET)
    const response = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Client-Id': config.public.TWITCH_CLIENT_ID
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error('Failed to get user data')
    }
    return data.data[0]
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Failed to get user data'
    })
  }
})