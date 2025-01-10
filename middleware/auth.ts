export default defineNuxtRouteMiddleware(async (to, from) => {
  const sessionCookie = useCookie('session').value

  if (!sessionCookie) {
    try {
      const { data } = await useFetch('/api/auth/refresh', {
        method: 'POST'
      });

      if (!data.value) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Failed to refresh token'
        });
      }
    } catch (error) {
      return navigateTo('/login')
    }
  }
})