// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui/'
  },
  runtimeConfig: {
    TWITCH_CLIENT_SECRET: process.env.NUXT_TWITCH_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    public: {
      TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
      TWITCH_REDIRECT_URI: process.env.TWITCH_REDIRECT_URI
    }
  }

})