export default defineNuxtPlugin((event) => {
  const config = useRuntimeConfig()
  let refreshPromise: Promise<any> | null = null
  
  const TWITCH_CLIENT_ID = config.public.TWITCH_CLIENT_ID
  const TWITCH_REDIRECT_URI = config.public.TWITCH_REDIRECT_URI
  
  const refreshTokenIfNeeded = async () => {
    const sessionCookie = useCookie('session').value

    if (!sessionCookie && !refreshPromise) {
      refreshPromise = useFetch('/api/auth/refresh', {
        method: 'POST'
      }).then((response) => {
        refreshPromise = null
        if (!response.data.value) {
          throw new Error('Failed to refresh token')
        }
        return response.data.value
      }).catch((error) => {
        refreshPromise = null
        navigateTo('/login')
        throw error
      })
    }

    return refreshPromise
  }
  
  const loginWithTwitch = () => {
    if (!config.public.TWITCH_CLIENT_ID) {
      return
    }
    const scopes = [
      'user:read:email',
      'channel:read:subscriptions',
      'bits:read',
      'channel:read:redemptions'
    ].join(' ')
    
    const state = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    useCookie('oauth_state').value = state
    
    const authUrl = `https://id.twitch.tv/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${TWITCH_CLIENT_ID}&` +
      `redirect_uri=${TWITCH_REDIRECT_URI}&` +
      `scope=${scopes}&` +
      `state=${state}`
    window.location.href = authUrl
  }

  return {
    provide: {
      auth: {
        loginWithTwitch,
        refreshTokenIfNeeded
      }
    }
  }
})