export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { code } = body;

  try {
    const tokenResponse = await $fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: config.public.TWITCH_CLIENT_ID,
        client_secret: config.TWITCH_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${config.public.TWITCH_REDIRECT_URL}`
      })
    });
    
    const userResponse = await $fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${tokenResponse.access_token}`,
        'Client-Id': config.TWITCH_CLIENT_ID
      }
    });

    return {
      user: userResponse.data[0],
      token: tokenResponse.access_token
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed'
    })
  }
})