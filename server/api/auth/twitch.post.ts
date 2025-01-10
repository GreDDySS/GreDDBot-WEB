import { AuthTokens } from "~/server/types/types"
import { defineEventHandler } from "h3";
import { createJWT } from "~/server/utils/jwt"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const savedState = getCookie(event, 'oauth_state');
  if (body.state !== savedState) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid state parameter'
    })
  }

  const params = new URLSearchParams({
    client_id: config.public.TWITCH_CLIENT_ID,
    client_secret: config.TWITCH_CLIENT_SECRET,
    code: body.code,
    grant_type: 'authorization_code',
    redirect_uri: `${config.public.TWITCH_REDIRECT_URI}`
  })

  try {
    const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
      method: 'POST',
      body: params,
    })

    const tokens: AuthTokens = await response.json();
    
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: 'Failed to get user data'
      })
    }

    const userResponse = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'Client-Id': config.public.TWITCH_CLIENT_ID
      }
    })

    const jwtToken = createJWT(tokens, config.JWT_SECRET)

    const userData = await userResponse.json();

    setCookie(event, "session", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: tokens.expires_in,
      path: '/'
    })

    return {
      user: userData.data[0],
      success: true,
    }
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to authenticate with Twitch'
    })
  }
})