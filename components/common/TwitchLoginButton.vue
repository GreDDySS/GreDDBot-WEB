<script setup lang="ts">
const { $auth } = useNuxtApp()
const isLoading = ref(false)
const config = useRuntimeConfig()

const handleLogin = async () => {
  isLoading.value = true
  try {
    if (!config.public.TWITCH_CLIENT_ID) {
      throw new Error('TWITCH_CLIENT_ID not found in configuration')
    }
    await $auth.loginWithTwitch()
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <button 
    @click="handleLogin"
    :disabled="isLoading"
    class="flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#9146FF] text-white rounded-lg hover:bg-[#7c2eff] disabled:bg-[#9146FF]/50 disabled:cursor-not-allowed transition-colors duration-200"
  >
    <!-- Иконка загрузки -->
    <svg 
      v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    
    <!-- Twitch иконка -->
    <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
    
    <span class="font-medium">
      {{ isLoading ? 'Загрузка...' : 'Войти через Twitch' }}
    </span>
  </button>
</template>